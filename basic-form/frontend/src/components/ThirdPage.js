import React, {useContext} from 'react'
import { GlobalContext } from '../context/Globalcontext'
import './ThirdPage.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ThirdPage = () => {
  const {state,setCounts,targetId, updateFlag} = useContext(GlobalContext)

  async function handlePost(){
    //POST
        await axios.post('http://localhost:3001/postData', {...state})
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
    
        setCounts(prev=> prev+1)
  }

  
  async function handleUpdate(){
    //POST
        await axios.patch(`http://localhost:3001/updateData/${targetId}`, {...state})
        .then(res=> console.log(res))
        .catch(err=> console.log(err))

        updateFlag.current = false
        setCounts(prev=> prev+1)

  }

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
       { updateFlag.current == false ?
        <button className='contBtn1' onClick={handlePost}>SAVE</button>
        :
        <button className='contBtn1' onClick={handleUpdate}>Update</button>
       }

        </Link>
    </div>

      </div>

    </div>
     )
}

export default ThirdPage