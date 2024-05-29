import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/Globalcontext'
import { Link } from 'react-router-dom'
import './SecondPage.css'

const SecondPage = () => {

    const { loadSecondPage, secondPageData, setSecondPageData} = useContext(GlobalContext)

    function handleClick(){
        loadSecondPage(secondPageData) 
    }

  return (
    <div>

    <header>
        this is second header
    </header>
        

    <form onSubmit={handleClick} className='Form_wrapper'>

        <div className='firstInput'>Occupation
        <input type='text' minLength='3' maxLength='20'  value={secondPageData.occupation} onChange={(e)=>{setSecondPageData({...secondPageData, occupation:e.target.value })}} placeholder='enter Occupation' />
        </div>

        <div className='secondInput'>City
        <input type='text' minLength='3' maxLength='20' value={secondPageData.city} onChange={(e)=>{setSecondPageData({...secondPageData, city:e.target.value })}} placeholder='enter City' />
        </div>

        <div className='thirdInput'>Bio
        <input type='text' minLength='3' maxLength='20' value={secondPageData.bio} onChange={(e)=>{setSecondPageData({...secondPageData, bio:e.target.value })}} placeholder='enter Bio' />
        </div>

                <div className='btn_wrapper'>
                    <Link to='/'>
                <button className='backBtn'>Back</button>
                </Link>

                {
                    (secondPageData.occupation && secondPageData.city && secondPageData.bio ) ?
                    <Link to='/thirdPage'>
                    <button className='contBtn1' onClick={handleClick} type='submit'>Continue</button>
                    </Link> :
                    <button className='contBtn' disabled>Continue</button> 
                }
                

            </div>

    </form>

    </div>
    )
}

export default SecondPage