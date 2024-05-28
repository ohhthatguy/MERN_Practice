import React from 'react'

import {  Routes, Route } from 'react-router-dom'
import './MainForm.css'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'
import FourthPage from './FourthPage'

const MainForm = () => {

    // const {count} = useContext(GlobalContext)

  return (
    <div>

      <Routes>
            <Route path='/' element={ <FirstPage /> } /> 
            <Route path='/secondPage' element={ <SecondPage /> } /> 
            <Route path='/thirdPage' element={ <ThirdPage /> } /> 
            <Route path='/fourthPage' element={ <FourthPage /> } />
      </Routes>
  

    </div>

  )

}

export default MainForm