import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../firebase";
import { useState } from "react";



const useUploadImg = () => {
  const [imgPercent, setImgPercent] = useState(0)
  const [imgUploading, setImgUploading] = useState(false)
  const [imgURL, setImgURL] = useState(null)

  const uploadImgToFirebase = (img) => {
    setImgUploading(true)
    const storage = getStorage(firebaseApp);
    const date = new Date();
    const imgName = `${date.getTime()}_${img.name}`;
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPercent(Math.round(progress))
      },
      (error) => {
        console.log(error);
        setImgUploading(false)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setImgUploading(false)
          setImgURL(downloadURL)
        } catch (error) {
          setImgUploading(false)
          console.log(error);

        }
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   setImgUploading(false)
        //   setImgURL(downloadURL)
        // });
      }
    );
  };

  return { uploadImgToFirebase, imgPercent, imgUploading, imgURL }
}

export default useUploadImg