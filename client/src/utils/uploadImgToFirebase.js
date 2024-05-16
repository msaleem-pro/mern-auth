import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../firebase";
const uploadImgToFirebase = async (img) => {
  const storage = getStorage(firebaseApp);
  const date = new Date();
  const imgName = `${date.getTime()}_${img.name}`;
  const storageRef = ref(storage, imgName);
  const uploadTask = uploadBytesResumable(storageRef, img);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(Math.round(progress));
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

export default uploadImgToFirebase;
