import React,{useContext, useEffect, useRef, useState} from 'react'
import './FourthPage.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/Globalcontext'
import axios from 'axios'

const FourthPage = () => {

  const {setFirstPageData, setSecondPageData, state, update, setUpdate, counts} = useContext(GlobalContext)
  const isLoadedFirstTime = useRef(true);
  const [userData, setUserData] = useState();
  const [isDeleted, setIsDeleted] = useState(0)
  // const [isUpdated, setIsUpdated] = useState(0)
  // const [dataOfId, setDataOfId] = useState({
  //   fName: '',
  //   lName:'',
  //   email:'',
  //   occupation: '',
  //   city: '',
  //   bio: ''
  // })

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

  // useEffect(()=>{

  //   if(isUpdated.current){
  //     isUpdated.current=false
  //     return
  //  }

  //  console.log(dataOfId)


  // //   setFirstPageData({
  // //     fName: dataOfId.fName,
  // //     lName: dataOfId.lName,
  // //     email: dataOfId.email
  // // })

  // // setSecondPageData({
  // //     occupation: dataOfId.occupation,
  // //     city: dataOfId.city,
  // //     bio:dataOfId.bio
  // // })

  // }, [dataOfId])

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
    console.log(id)

    // get data of that id
    getDataById(id);
   setUpdate(prev=>prev+1)
    // update
    await axios.patch(`http://localhost:3001/updateData/${id}`, {...state})
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
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
        {/* <Link to='/'> */}
        <button  onClick={handleClick}>fill next userData</button>
        {/* </Link> */}
      </div>

      {
        (userData) && 
        
        userData.map((e)=>(
          <div key={e._id}>
            <div>
              <span>{e.fName}</span>
              <span>{e.lName}</span>
              <span>{e.email}</span>
              <span>{e.occupation}</span>
              <span>{e.city}</span>
              <span>{e.bio}</span>
            </div>

            <Link to='/'>
            <button onClick={()=>handleUpdate(e._id)}>UPDATE</button>
            </Link>

            <button onClick={()=>handleDelete(e._id)}>DELETE</button>
          </div>
        ))

      }
  </>)
}

export default FourthPage