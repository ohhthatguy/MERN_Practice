import React,{useState} from 'react'
import Login from './components/Accounts/Login'
import DataProvider from './context/DataProvider'
import { Route,Routes,Outlet,Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import NewBlog from './components/Create/NewBlog'
import Details from './components/Details/Details'
import Update from './components/Update/Update'

const PrivateRoute = ({isLoggedIn}) =>{

  //here, outlet is the children PrivateRoute Contains. Navigate part tells to replace any component with
  //'login' if isLoggedIn is false

  //since, Outlet only once when user is logged in thats when we would want to show our header/footer.

  return isLoggedIn ? 
      <> 
        <Header /> 
        <Outlet /> 
      </> 
      : <> 
        <Navigate replace to='/logIn' /> 
      </>

}

const App = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false) //checks if user is logged in succefully

  return (    <div style={{marginTop: "4.2rem"}}>
  <DataProvider>
    <Routes>

    {/* This has become a public Route */}
      <Route path='/logIn' element={ <Login setIsLoggedIn={setIsLoggedIn}/> } />

    {/* now this has become the PrivateRoute */}
      <Route path='/' element={<PrivateRoute isLoggedIn={isLoggedIn} />} > 
        <Route path='/' element={  <Home /> } />
        <Route path='/' element={  <Home /> } />
      </Route>

      <Route path='/create' element={<PrivateRoute isLoggedIn={isLoggedIn} />} >
        <Route path='/create' element={ <NewBlog /> } />
      </Route>

      <Route path='/detail/:id' element={<PrivateRoute isLoggedIn={isLoggedIn} />} >
        <Route path='/detail/:id' element={ <Details /> } />
      </Route>

      <Route path='/update/:id' element={<PrivateRoute isLoggedIn={isLoggedIn} />} >
        <Route path='/update/:id' element={ <Update /> } />
      </Route>


    </Routes>
  </DataProvider>  
  </div>)
}

export default App