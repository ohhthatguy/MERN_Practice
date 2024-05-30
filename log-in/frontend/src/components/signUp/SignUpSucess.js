import React from 'react'
import { Link } from 'react-router-dom'
const SignUpSucess = () => {
  return (<>
  <div className='border-blue-600 border-4 p-2 '>
        <header className=' border border-black text-center'>SUCESSFULLY SIGNED UP!</header>

        <div className='text-center text-2xl'>You Have been suceffuly signed in! </div>

        <Link to='/'><div className='text-center m-4'>
        <button className='border border-red-500 w-1/3 text-xl p-2 active:scale-105  hover:bg-black hover:text-white '>Enter APP</button>

        </div>
        </Link>

    </div>
    </>)
}

export default SignUpSucess