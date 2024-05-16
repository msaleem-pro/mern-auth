import useUploadImg from "../hooks/useUploadImg";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInStart, signInFail } from "../store/features/user-slice";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { updateUser } from "../utils/APIs";

const Profile = () => {
  const { uploadImgToFirebase, imgPercent, imgUploading, imgURL } = useUploadImg()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [imgFile, setImgFile] = useState(undefined)
  const [fieldData, setFieldData] = useState({})

  const { user, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const loadImage = (e) => {
    setImgFile(e.target.files[0])

  }
  const getFieldsInput = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value)
      setFieldData({ ...fieldData, [e.target.id]: e.target.value })
    } else if (e.target.id === "email") {
      setEmail(e.target.value)

      setFieldData({ ...fieldData, [e.target.id]: e.target.value })
    } else {
      setPassword(e.target.value)
      setFieldData({ ...fieldData, [e.target.id]: e.target.value })
    }
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();
    let data = null;
    data = JSON.stringify(fieldData)
    if (imgURL) {
      data = JSON.stringify(
        { ...fieldData, profileImg: imgURL }
      )
    }
    updateUser(`api/user/update-user/${user.id || user._id}`, data)
      .then(result => {
        console.log(result)
        dispatch(signInSuccess(result.user))
      })
  }


  useEffect(() => {
    if (imgFile) {
      uploadImgToFirebase(imgFile)
    }
  }, [imgFile])

  useEffect(() => {
    setUsername(user?.username || "")
    setEmail(user?.email || "")
  }, [user])


  return (
    <div className='w-full '>
      <div className="container m-auto px-6">
        <div className="w-full  flex justify-center items-start">
          <div className='w-[400px]  mt-5 bg-white/30 border border-gray-200 p-7 rounded-xl '>

            <form onSubmit={handleUpdateUser}>
              <div>
                <div className='m-auto w-[110px] h-[110px] rounded-full overflow-hidden relative '>
                  <img src={imgURL || user.profileImg} className='w-full h-full object-cover' alt="rgr" />
                  <div className="absolute top-0 left-0 w-full h-full">
                    <label htmlFor="profileImg" className="w-full h-full bg-black/30 opacity-0 flex items-center justify-center hover:opacity-100 hover:cursor-pointer">
                      <FaCamera className="text-4xl text-black/60" />
                    </label>
                    <input type="file" id="profileImg" className="hidden" onChange={loadImage} />
                  </div>
                </div>
                <div className="flex justify-center mt-2 h-7">
                  {
                    imgUploading && <h4 className="text-sm">Uploading: {imgPercent}%</h4>
                  }
                </div>
              </div>

              <div className='mt-5'>
                <label htmlFor="username" className='text-sm'>Username</label>
                <input type="text" placeholder='email@example.com' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' value={username} id='username' onChange={getFieldsInput} />
              </div>
              <div className='mt-5'>
                <label htmlFor="email" className='text-sm'>Email</label>
                <input type="text" placeholder='email@example.com' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' value={email} id='email' onChange={getFieldsInput} />
              </div>

              <div className='mt-5'>
                <label htmlFor="password" className='text-sm'>Password</label>
                <input type="password" placeholder='•••••' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' onChange={getFieldsInput} id='password' />
              </div>

              <div className='mt-5 flex justify-between items-center'>
                <button className='bg-blue-600 text-white rounded-md text-sm font-medium w-full py-3 relative'>Update</button>

              </div>
            </form>
            <div className='mt-5 flex justify-between'>
              <button className=' font-medium rounded text-red-500 '>Logout</button>
              <button className=' font-medium rounded text-red-500 '>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile