import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { uploadData } from "../utils/APIs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInStart, signInFail } from "../store/features/user-slice";
import Loader from "../components/Loader";
import GoogleAuth from "../components/GoogleAuth";


const SignIn = () => {
  const { user, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(user, loading, error)

  const navigate = useNavigate();
  const notify = (msg) => toast.error(msg);
  const [fieldsInput, setFieldsInput] = useState({})
  const getFieldsInput = (e) => {

    setFieldsInput({ ...fieldsInput, [e.target.id]: e.target.value })
  }

  const uploadFormData = (e) => {
    e.preventDefault()
    if (!fieldsInput.email || fieldsInput.email === "" || !fieldsInput.password || fieldsInput.password === "") {
      return;
    }
    const data = JSON.stringify(fieldsInput)
    dispatch(signInStart())
    uploadData("api/auth/sign-in", data)
      .then(result => {
        console.log(result)
        if (result.success) {
          e.target.reset()
          dispatch(signInSuccess(result.user))
          navigate("/profile")

        } else {
          dispatch(signInFail())
          notify(result.msg)
        }
      }).catch(error => {
        dispatch(signInFail())
        notify("Something went wrong.")
      })

  }

  return (

    <div className='w-full h-[90vh]'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container h-full">
        <div className="w-full h-full flex justify-between items-center">
          <div className='w-1/2 flex justify-center'>
            <img src="/images/signin.png" className='w-[60%] drop-shadow-xl' alt="" />
          </div>
          <div className='w-1/2 flex justify-center'>
            <div className='w-[400px] bg-white p-10 rounded-lg'>

              <h4 className='text-2xl font-semibold'>Sign In</h4>
              <div className="text-gray-600 mt-1.5">Don't have account?
                <NavLink to={'/sign-up'} className={"text-blue-500 ml-2"}>Sign Up</NavLink></div>
              <form action="" className='mt-4' onSubmit={uploadFormData}>

                <div className='mt-5'>
                  <label htmlFor="email" className='text-sm'>Email</label>
                  <input type="text" placeholder='email@example.com' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' id='email' onChange={getFieldsInput} />
                </div>

                <div className='mt-5'>
                  <label htmlFor="password" className='text-sm'>Password</label>
                  <input type="password" placeholder='•••••' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' id='password' onChange={getFieldsInput} />
                </div>


                <div className='mt-5'>
                  <button
                    className={`bg-blue-600 text-white rounded-md text-sm font-medium w-full py-3 relative ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading && (
                      <div className="w-[18px] h-[18px] absolute top-[50%] left-[35%] -translate-y-[50%]">
                        <Loader />
                      </div>
                    )}
                    <span>{loading ? 'Loading...' : 'Sign in'}</span>
                  </button>

                </div>
              </form>
              <div className='mt-5'>
                <GoogleAuth />
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn