import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/Globalcontext'
import './ThirdPage.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ThirdPage = () => {
  const {state, update,setCounts} = useContext(GlobalContext)


  async function handleClick(){
    console.log(state)
    //POST
  
        await axios.post('http://localhost:3001/postData', {...state})
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
    
        setCounts(prev=> prev+1)
      
  
  }

  useEffect(()=>{

    
  
  },[update])

  return (
    <div className='Form_container'>

      <header>THis is a third header</header>

      <div className='confirmationPage_wrapper'>
       
        {

          Object.entries(state).map(([key, value], index)=>(
            <div className='userDetail_div' key={index}>
              {key}
              <div>{value}</div>
            </div> 
          ))
        }

<div className='btn_wrapper'>
      <Link to='/secondPage'>
        <button className='backBtn'>Back</button>
      </Link>

      <Link to='/fourthPage'>
        <button className='contBtn1' onClick={handleClick}>Continue</button>
        </Link>
    </div>

      </div>

    </div>
     )
}

export default ThirdPage