import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    function handleSignUp(){
        console.log("in page 2")
    }
  return (<>
   <div className='border-blue-600 border-4 p-2 '>
        <header className=' border border-black text-center'>SignUpPage</header>

        <form className='border border-red-600 p-2 mt-4 grid gap-4 place-items-center'>

            <div className=' border border-black w-1/4 relative' >
       
                <input className=' peer border border-black w-full p-2' type='text' required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs'>FirstName</label>
              
            </div>

            <div className=' w-1/4 relative' >
       
                <input className=' peer border border-black w-full p-2' type='text' required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs  '>LastName</label>
     
            </div>

            <div className=' w-1/4 relative' >
       
                <input className=' peer border border-black w-full p-2' type='text' required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs '>UserName</label>

            </div>

            <div className=' w-1/4 relative' >
                    
                    <input className=' peer border border-black w-full p-2' type='text' required/>
                    <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs '>Email</label>

            </div>

            <div className=' w-1/4 relative' >
                
                <input className=' peer border border-black w-full p-2' type='password' required/>
                <label className='absolute left-1 top-1.5 text-xl ease-in duration-300 peer-valid:-top-2 peer-valid:left-2.5 peer-valid:bg-white peer-valid:text-xs peer-focus:-top-2 peer-focus:left-2.5 peer-focus:bg-white peer-focus:text-xs  '>password</label>

            </div>

            <Link to='/signup/sucess'>
                
                    <button className=' border border-red-600 w-full p-1  active:scale-105  hover:bg-black hover:text-white ' onClick={handleSignUp}>SIGNUP</button>                    
             

                </Link>

        </form>

        


    </div>
  
  </>
    
  )
}

export default SignUpPage