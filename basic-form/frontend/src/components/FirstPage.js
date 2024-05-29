import React,{useContext} from 'react'
import { GlobalContext } from '../context/Globalcontext'
import './FirstPage.css'
import { Link } from 'react-router-dom'

const FirstPage = () => {
    const { loadFirstPage, setFirstPageData, firstPageData} = useContext(GlobalContext)
 
    function handleClick(){
        loadFirstPage(firstPageData)
    }
    
  return (
  
    <div className='Form_container'>

    <header>
        this is a header
    </header>
        

    <form onSubmit={handleClick} className='Form_wrapper'>

        <div className='firstInput'>First Name
        <input type='text' value={firstPageData.fName} minLength='3' maxLength='20' onChange={(e)=>{setFirstPageData({...firstPageData, fName:e.target.value })}} placeholder='enter first name' required  />
        </div>

        <div className='secondInput'>Last Name
        <input type='text' value={firstPageData.lName} minLength='3' maxLength='20'  onChange={(e)=>{setFirstPageData({...firstPageData, lName:e.target.value })}} placeholder='enter last name' required />
        </div>

        <div className='thirdInput'>email
        <input type='email' value={firstPageData.email} onChange={(e)=>{setFirstPageData({...firstPageData, email:e.target.value })}} placeholder='enter email' required />
        </div>

        
            <div className='btn_wrapper'>
                
                {
                    (firstPageData.fName && firstPageData.lName &&  firstPageData.email) ?

                   <Link to='/secondPage'>
                     <button type='submit' className='contBtn1' onClick={handleClick}>Continue</button> 
                     </Link>
:
                  
                    <button className='contBtn'  disabled>Continue</button>
                }
          </div>

    </form>



    </div>
   
  )
}

export default FirstPage