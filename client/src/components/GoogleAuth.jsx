import { FcGoogle } from "react-icons/fc";
import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseApp } from '../firebase'
import { uploadDataViaGoogle } from "../utils/APIs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInStart, signInFail } from "../store/features/user-slice";

const GoogleAuth = () => {
  const { user, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(firebaseApp)
  const googleAuthHandler = async (e) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider)
      if (result) {
        console.log(result)
        const data = JSON.stringify({
          displayName: result.user.displayName,
          email: result.user.email,
          profileImg: result.user.photoURL
        })
        uploadDataViaGoogle("api/auth/google-auth", data)
          .then(result => {
            if (result.success) {
              dispatch(signInSuccess(result.user))

              navigate('/profile')
            }
          }).catch(error => {
            console.error(error)
          })
      }
    } catch (error) {
      console.error(error, "hhhh")
    }
  }
  return (

    <button className=' bg-blue-50  text-blue-600 rounded-md text-sm font-medium w-full py-3 flex items-center justify-center gap-3' onClick={googleAuthHandler}>
      <span className=""><FcGoogle className="text-2xl" /></span>
      <span>Continue with Google</span>
    </button>
  )
}

export default GoogleAuth