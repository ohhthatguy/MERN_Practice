import React,{useState, useContext} from 'react'
import {Box, TextField, Button, Typography, styled} from '@mui/material'
import { API } from '../../services/Api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)`
    border:1px solid #4caf50;
    width: 400px;
    margin:  6rem auto;
    box-shadow: 1px 2px 1px 1px #121;

`;

const InnerWrapper = styled(Box)`
    margin: 3rem;
    margin-bottom: 1rem;
    // border: 1px solid black;
    display: flex;
    gap: 2rem;
    align-items: center;
    flex-direction: column;
     & > div, & > button{
     width: 100%;
     }   
`

const StyledButton = styled(Button)`

    &:active{
        transform: scale(1.02);
    }
`
const ErrorBox = styled(Box)`
    // border: 1px solid black;
    text-align: center;
    margin-left: 3rem;
    margin-right: 3rem;
    margin-bottom:2rem;
    
`

 const Login = ({setIsLoggedIn}) =>{

    const {setAccount} = useContext(DataContext)

    const [isValidated, setIsValidated] = useState({
        email: false,
        name: false,
        password: false
    })

    const [errMsg, setErrMsg] = useState()
    
    const [logIn, setLogIn] = useState({
        email: '',
        password: ''
    })

    const [signIn, setSignIn] = useState({
        email:'',
        name: '',
        password: ''
    })

    const [hasAccount, setHasAccount] = useState(true)

    //regEx for validation 
    const regExName = /^[a-zA-Z]{2,20}$/
    const regExEmail = /^[a-zA-Z0-9]{3,}@[a-z]{3,10}.[a-zA-Z.]{2,}$/
    const regExPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,12}$/

    const handleLogIn = (e) =>{
        setLogIn({...logIn, [e.target.name]: e.target.value})
    }
  
    const handleSignIn = (e) =>{
      
        switch(e.target.name){
    

            case 'email':
                if(regExEmail.test(e.target.value)){
                   setIsValidated({...isValidated, email: true})
                }else{
                   setIsValidated({...isValidated, email: false})
                }
                break;
            
            case 'name':
                if(regExName.test(e.target.value)){
                    setIsValidated({...isValidated, name: true})
                    break 
                }else{
                    setIsValidated({...isValidated, name: false})
                 }
                 break;

            case 'password':
                if(regExPassword.test(e.target.value)){
                    setIsValidated({...isValidated, password: true})
                    break 
                }else{
                    setIsValidated({...isValidated, password: false})
                 }
                 break;
        }

        setSignIn({...signIn, [e.target.name]: e.target.value})
    }

    const signInData = async() =>{
        console.log(signIn);
   
     let response = await API.userSignUp(signIn)
 
        if(response.isSuccess == true){ //data is send to db successfully
            setHasAccount(true) //goes back to login
            setErrMsg(``)
            console.log('here')
        }else{
            setHasAccount(false) //goes to create account
            setErrMsg(`something's wrong ! please try again! `)
        }

     
        
    }

    const navigate = useNavigate()

    const logInUser = async()=>{
        
        console.log('here11')
       
        try{
            let response = await API.userLogIn(logIn)

            if(response.isSuccess == true){
                setLogIn({
                    email: '',
                    password: ''
                })
                setErrMsg(``)
                sessionStorage.setItem('accessToken', `bearer ${response.data.accessToken}`)
                sessionStorage.setItem('refreshToken', `bearer ${response.data.refreshToken}`)
                setAccount({
                    email: response.data.email,
                    name: response.data.name
                })
                setIsLoggedIn(true) //this is linked to APP.js 
                navigate('/') //after sucefully cong=firming user, goto homepage

            }else{
                 setErrMsg(` password or email is wrong! `)
            }
        }catch(err){
            setErrMsg(` please try again! `)
            console.log('error', err)

        }
            
    }


    return (<>

        <Wrapper>

           <Typography variant='h3' sx={{textAlign: "center"}}> login </Typography>

            {
                (hasAccount) ?

            <InnerWrapper>
                <TextField variant="standard" value={logIn.email} name='email' onChange={(e)=> handleLogIn(e)} label="enter email" />
                <TextField variant="standard" value={logIn.password} name='password'onChange={(e)=> handleLogIn(e)}  type='password' label="enter Password" />
                <StyledButton variant='contained' onClick={()=> logInUser()}>login</StyledButton>
                <Button variant='outlined' onClick={()=> setHasAccount(false)}>Create an account</Button>
            </InnerWrapper>
     :
            <InnerWrapper>
                <TextField variant="standard" name='email' onChange={(e)=> handleSignIn(e)} label="enter email" />
                <TextField variant="standard" name='name' onChange={(e)=> handleSignIn(e)} label="enter name" />
                <TextField variant="standard" name='password' onChange={(e)=> handleSignIn(e)}  type='password' label="enter Password" />
                
                <StyledButton variant='contained' disabled={(isValidated.name && isValidated.email && isValidated.password) ? false : true} onClick={()=> signInData()}>Sign IN</StyledButton>
                
                <Button variant='outlined' onClick={()=> setHasAccount(true)}>Already have an account</Button>
                        
            </InnerWrapper>

    }
    <ErrorBox>{errMsg}</ErrorBox>

        </Wrapper>
   
    </>)
 } 

 export default Login