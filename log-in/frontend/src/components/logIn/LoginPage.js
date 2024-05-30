import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [userLogInData, setUserLogInData] = useState({
        email: '',
        password: ''
    })
    const [isReady,setIsReady]=useState({
        rightEmail: 'false',
        rightPassword: 'false'
    })
    
    const [errorMessage, setErrorMessage]=useState({
        emailError: '',
        passwordError: ''
    })

    const emailRegEx = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,}$/
    const passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@.!?]{3,}$/

        console.log(userLogInData)
        console.log(errorMessage)
        console.log(isReady)

//check email
  useEffect(()=>{
    console.log("here")
    if(!emailRegEx.test(userLogInData.email)){
            console.log("Add a valid email")
           setErrorMessage({...errorMessage, emailError: 'Add a valid email'})
           setIsReady({...isReady, rightEmail: false})

        }else{
            setIsReady({...isReady, rightEmail: true})
            setErrorMessage({...errorMessage, emailError: ''})
        }
       

        

  },[userLogInData.email])
       
//check password
  useEffect(()=>{
    console.log("here")
    if(!passwordRegEx.test(userLogInData.password)){
            console.log("MUST HAVE A DIGIT, SMALL LETTER, BIG LETTER AND MINIMUM OF 5 CHARACTER")
            setErrorMessage({...errorMessage, passwordError: 'MUST HAVE A DIGIT, SMALL LETTER, BIG LETTER AND MINIMUM OF 5 CHARACTER'})

            setIsReady({...isReady, rightPassword: false})

        }else{
            setIsReady({...isReady, rightPassword: true})

            setErrorMessage({...errorMessage, passwordError: ''})
        }
       



  },[userLogInData.password])
    


  return (<>
    <div className='border-blue-600 border-4 p-2 '>
        <header className=' border border-black text-center'>LOG-IN PAGE</header>

        <form className='border border-red-600 p-2 mt-4 grid gap-4 place-items-center'>

            <div className=' border border-black w-1/4 relative' >
       
                <input className=' peer border border-black w-full p-2 ' value={userLogInData.email} onChange={(e)=>  setUserLogInData({...userLogInData, email: e.target.value})} type='text' required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs  '>email</label>
                <div>{`${errorMessage.emailError}`}</div>
            </div>

            <div className=' w-1/4 relative' >
       
                <input className=' peer border border-black w-full p-2' type='password'  onChange={(e)=>{setUserLogInData({...userLogInData, password: e.target.value})}}  value={userLogInData.password} required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs'>password</label>
                <div>{`${errorMessage.passwordError}`}</div>
            </div>

                <Link to= {(isReady.rightEmail==true && isReady.rightPassword==true) ?  '/welcome'  : '/' }>
                <button  className='border w-full p-1 bg-green-800 active:scale-105  hover:bg-black hover:text-white border-red-900' >LogIN</button>
                </Link>
            <div>
                Don't have an account ? <Link to='/signup'>
                                        <span> <button className='hover:text-blue-600'>signup</button></span>
                                        </Link>
                
            </div>

        </form>


    </div>
    </>)
}

export default LoginPage