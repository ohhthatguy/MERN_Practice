import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../services/Api';
import { Box,  styled } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
// import Post from "../../../../backend/model/post";
import Comment from '../Comments/Comment';


const Container = styled(Box)`
    margin: 25px 20px;
`

const Title = styled(Box)`
    font-size: 2rem;
    text-align: center;
`

const Description = styled(Box)`
    font-size: 1.2rem;  
`

const Icons = styled(Box)`
    text-align: right;  
`

const Image = styled('img')`
    height: 20rem;
    width: 100%;
    object-fit: cover;
    object-position: 20% 20%;
`

const Details = ()=>{
    const {id} = useParams();
    console.log(id)
    const [post,setPost] = useState();
    
    const navigate = useNavigate();
    const imgUrl =post?.image ? post.image :  'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    
    useEffect(()=>{
        console.log("hello im inside useeffect to fecht")
    const fetchData = async()=>{
        try{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data)
                console.log(`inside the useEffect`)
                // console.log(response)
                // console.log(post)
            }else{
                console.log("Error in getting the selecting blog")
            }
        }catch(err){
            console.log(err)
        }
       
    }

    fetchData();

},[])


    const deleteblog = async()=>{
        console.log("clicked delete")
        try{
            let res =  await API.deleteBlog(post._id)
            if(res.isSuccess){
                console.log("successfully deleted blog")
                navigate('/')
            }
        
            
        }catch(err){
            console.log("error while delteing the blog ")
            console.log(err)
        }
    

    }
    
   

    return (<>
        <Container>
            <Box>
                <Image src={`${imgUrl}`} alt='cover image' />
                asdasasd img was here
            </Box>
            <Icons>
               
                <Link to={`/update/${post?._id}`}>
                     <Edit />
                </Link>
                
                <Delete onClick={()=> deleteblog()}/>
            </Icons>
            <Title>{post?.title}</Title>
            <Description>{post?.description}</Description>

           <Comment post={post}/> 

        </Container>
      
        


    </>)
}

export default Details;