import React,{useContext, useEffect, useRef, useState} from 'react'
import './FourthPage.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/Globalcontext'
import axios from 'axios'

const FourthPage = () => {

  const {setFirstPageData, updateFlag, setSecondPageData, setTargetId, counts} = useContext(GlobalContext)
  const isLoadedFirstTime = useRef(true);
  const [userData, setUserData] = useState();
  const [isDeleted, setIsDeleted] = useState(0)

 

   //GET
const getDataFromDb = async()=>{
        console.log("here")

          await axios.get('http://localhost:3001/getData')
          .then(res=> setUserData(res.data.data))
          .catch(err=> console.log(err))
        }

useEffect(()=>{
          if(isLoadedFirstTime.current){
            isLoadedFirstTime.current=false
            return
          }

          getDataFromDb();

        },[counts, isDeleted])

  function handleClick(){
    
    setFirstPageData({
      fName: '',
      lName: '',
      email: ''
    })

    setSecondPageData({
      occupation: '',
      city:'',
      bio:''
    })
  }

  async function getDataById(id){
    await axios.get(`http://localhost:3001/getData/${id}`)
    .then(res=> {
      console.log(res.data.data.fName)
      setFirstPageData({
        fName: res.data.data.fName,
        lName: res.data.data.lName,
        email: res.data.data.email
      })
  
      setSecondPageData({
        occupation: res.data.data.occupation,
        city:res.data.data.city,
        bio:res.data.data.bio
      })

            
    
    })
    .catch(err=> console.log(err))

  }


  async function handleUpdate(id){
    // get data of that id
    getDataById(id);
    updateFlag.current = true
    setTargetId(id)
  }

  async function handleDelete(id){
    console.log(id)
    await axios.delete(`http://localhost:3001/deleteUser/${id}`)
    setIsDeleted(prev=> prev+1)

  }


  return (<>
    <div className='fourthContainer'>
      User gave all the data in right format. Thank you!!
    </div>

    <div>
        <Link to='/'>
        <button  onClick={handleClick}>fill next userData</button>
        </Link>
      </div>

    <table className='resultTable'>
      <thead>
      <tr>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Email</th>
        <th>Occupation</th>
        <th>City</th>
        <th>Bio</th>
        <th>Options</th>

      </tr>
      </thead>
      <tbody>
      {
        (userData) && 
        
        userData.map((e)=>(
          <tr key={e._id}>

                <td>{e.fName}</td>
                <td>{e.lName}</td>
                <td>{e.email}</td>
                <td>{e.occupation}</td>
                <td>{e.city}</td>
                <td>{e.bio}</td>
                <td>
            
                    <Link to='/'>
                  <button onClick={()=>handleUpdate(e._id)}>UPDATE</button>
                  </Link>

                  <button onClick={()=>handleDelete(e._id)}>DELETE</button>
                 
                </td>

          </tr>
        ))

      }
      </tbody>
    </table>

  </>)
}

export default FourthPage