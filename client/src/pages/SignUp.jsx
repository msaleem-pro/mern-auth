import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { uploadData } from "../utils/APIs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from "../components/GoogleAuth";
// ________________________________________________________________
const SignUp = () => {
  const navigate = useNavigate();
  const notify = () => toast.error("Something went wrong!");
  const [fieldsInput, setFieldsInput] = useState({})
  const getFieldsInput = (e) => {

    setFieldsInput({ ...fieldsInput, [e.target.id]: e.target.value })
  }
  const uploadFormData = (e) => {
    e.preventDefault()
    if (!fieldsInput.username || fieldsInput.username === "" || !fieldsInput.email || fieldsInput.email === "" || !fieldsInput.password || fieldsInput.password === "") {
      return;
    }
    const data = JSON.stringify(fieldsInput)

    uploadData("api/auth/sign-up", data)
      .then(result => {
        if (result.success) {
          e.target.reset()
          navigate("/sign-in")

        } else {
          notify()
        }
      }).catch(error => {
      })

  }
  return (
    <div className='w-full h-[90vh]'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
              <h4 className='text-2xl font-semibold'>Register</h4>
              <div className="text-gray-600 mt-1.5">Already have an account?
                <NavLink to={'/sign-in'} className={"text-blue-500 ml-2"}>Sign In</NavLink></div>
              <form action="" className='mt-4' onSubmit={uploadFormData}>
                <div>
                  <label htmlFor="username" className='text-sm'>Username</label>
                  <input type="text" placeholder='username...' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' id='username' onChange={getFieldsInput} />
                </div>

                <div className='mt-5'>
                  <label htmlFor="email" className='text-sm'>Email</label>
                  <input type="text" placeholder='email@example.com' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' id='email' onChange={getFieldsInput} />
                </div>

                <div className='mt-5'>
                  <label htmlFor="password" className='text-sm'>Password</label>
                  <input type="password" placeholder='•••••' className='border w-full px-3 py-2 outline-none rounded-md focus:border-blue-500 mt-1' id='password' onChange={getFieldsInput} />
                </div>


                <div className='mt-5'>
                  <button className=' bg-blue-600 text-white rounded-md text-sm font-medium w-full py-3' >Register</button>
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

export default SignUp