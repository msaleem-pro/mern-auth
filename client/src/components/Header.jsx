import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <header className='bg-white py-[10px]'>
      <div className="container m-auto px-5 flex items-center justify-between">
        <div className="logo">
          <NavLink to={"/"} className={'text-2xl font-bold text-blue-600'}>
            Auth App
          </NavLink>
        </div>
        <nav className='flex items-center gap-14'>
          <ul className='flex gap-7'>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>

            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>


          </ul>
          <div>
            {
              user ? <button className='w-[40px] h-[40px] rounded-full overflow-hidden' onClick={() => navigate("/profile")}>
                <img src={user.profileImg} alt="" />
              </button> : <div className=''>
                <NavLink to={"/sign-in"} className={'mr-5'}>Sing In</NavLink>

                <NavLink to={"/sign-up"} className={'px-7 py-2 bg-blue-600 text-white rounded text-sm font-medium'}>Sign Up</NavLink>
              </div>
            }








          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header