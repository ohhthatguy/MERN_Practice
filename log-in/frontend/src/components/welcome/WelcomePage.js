import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (<>
  
        <div className='border border-red-600 m-10'>
            <nav className='border border-red-600 flex justify-between'>
                <logo>LOGO</logo>
                <div>`What's good, $username ?!`</div>
                <Link to='/'>
                    <button className='hover:bg-black hover:text-white active:scale-105 duration-100'>LOGOUT</button>
                </Link>
            </nav>

            <div className='text-xl m-2 grid grid-cols-2 gap-x-8'>

                <div className='border border-red-950 text-center'>photo here in grid</div>
                <div className='border border-red-950'>
                    <div>FirstName: $fname</div>
                    <div>lastname: $lname</div>
                    <div>email: $email</div>

                </div>

            </div>

        </div>
  
    </>)
}

export default WelcomePage