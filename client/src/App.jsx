import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, About, Contact, SignIn, SignUp, Profile } from './pages'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import "./style.css";
const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />


          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App