import React,{useState ,useEffect, useContext} from 'react'
import { Box, Button, FormControl, InputBase, TextField, styled, TextareaAutosize } from '@mui/material'
import {AddPhotoAlternateSharp as AddPhoto} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/Api';



const Container = styled(Box)`
    margin: 0px 50px;
`
const ImageBox = styled(Box)`
height: 40vh;
border: 1px solid black;
`
const Image = styled('img')`
      height: inherit;
        object-fit: cover;
                object-position: center;
`
// const StyledTextField = styled(TextField)`
//     display: flex;
//     flex: 1;
// `
const StyledFormControl = styled(FormControl)`
    // border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex:1;
`
const StyledInputBase = styled(InputBase)`
    flex:1;
    margin-right: 10px;
    font-size: 2rem;
`

const StyledButton = styled(Button)`
   margin-left: 10px;
`
const StyledTextareaAutosize = styled(TextareaAutosize)`
   width: 100%;
   margin-top: 10px;
   font-size: 1.3rem;
   padding: 8px;
`

const Home = () => {

    const {account} = useContext(DataContext)

    const initialUserInput = {
        title: '', // by Onchange function
        description: '', // by Onchange function
        image: '',
        userName: '', //through session storage thats currently stored globally using context
        category: '', //through params
        createdDate: new Date() // on creation
    };

    const [post, setPost] = useState(initialUserInput)
    const [file, setFile] = useState(null) //photos are saved here 

    const [searchParams] = useSearchParams()
    const currentCategory = searchParams.get('category'); 
    
    
    const getDataFromTextfields = (e)=>{
        setPost({...post, [e.target.name]: e.target.value})
        console.log(post)
    }

    useEffect(()=>{

            const handleImage= async()=>{
                if(file){

                    console.log(file.type)
                    console.log(file.name)
                    console.log(file)

                    const data = new FormData();
                    data.append('name', file.name)
                    data.append('file', file)

                    
                    for (const [key, value] of data.entries()) {
                        if (key === 'file') {
                          console.log(`${key}:`, value, value instanceof Blob); // Check if the value is a Blob
                        } else {
                          console.log(`${key}:`, value);
                        }
                      }
                  
                    //call the API that'll upload this file(image) in mongodb
                    try{
                        const response = await API.uploadFile(data)  //this wil give the url of img in mongodb
                        console.log(response)
                        setPost({...post, image: response.data}) //url of img in mongodb is placed 
                    }catch(err){
                        console.log(err)
                    }
                   
                    
                }else{
                    console.log("file is empty")
                }
            }

            handleImage()
            setPost({...post, category: currentCategory})
            setPost({...post, userName: account.name})
            console.log(post)

},[file])

console.log(post.image)

    const imgUrl =post.image ? post.image :  'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  
   
  return (
    <Container>

        <ImageBox>
            <Image src={imgUrl} alt='cover photo' />
        </ImageBox>

        
            <StyledFormControl>
                
                <input type='file' id='chooseFile' onChange={(e)=> setFile(e.target.files[0])} style={{display: 'none'}}/>

                <StyledInputBase placeholder='Title' name='title' onChange={(e)=> getDataFromTextfields(e)}/>
                    <label htmlFor='chooseFile'>
                        <AddPhoto fontSize='large' />
                    </label>
                <StyledButton variant='contained' >Create</StyledButton>
        

            </StyledFormControl>

        <StyledTextareaAutosize name='description' onChange={(e)=> getDataFromTextfields(e)} minRows={5} placeholder= {`what's on your mind.. `} />
   
      
    </Container>
  )
}

export default Home