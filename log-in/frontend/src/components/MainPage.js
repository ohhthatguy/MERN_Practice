import React from 'react'
import LoginPage from './logIn/LoginPage'
import SignUpPage from './signUp/SignUpPage'
import SignUpSucess from './signUp/SignUpSucess'
import WelcomePage from './welcome/WelcomePage'
import { Route, Routes } from 'react-router-dom'



const MainPage = () => {
  return (<>
   <Routes>

    <Route path='/' element={<LoginPage />} />
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/signup/sucess' element={<SignUpSucess />}  /> 
    <Route path='/welcome' element={<WelcomePage />}  />
    


   </Routes>
   </>)
}

export default MainPage