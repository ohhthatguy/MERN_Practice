import {useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../services/Api';
import { Box, Typography, styled } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';


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
    const [post,setPost] = useState({});
    console.log(post)
    const navigate = useNavigate();

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

    useEffect(()=>{
        const fetchData = async()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data)
            }else{
                console.log("Error in getting the selecting blog")
            }
        }
        fetchData()
    },[])

    const imgUrl =post.image ? post.image :  'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    


    return (<>
        <Container>
            <Box>
                <Image src={`${imgUrl}`} alt='cover image' />
            </Box>
            <Icons>
                <Link to={`/update/${post._id}`}>
                    <Edit />
                </Link>
                <Delete onClick={()=> deleteblog()}/>
            </Icons>
            <Title>{post.title}</Title>
            <Description>{post.description}</Description>
        </Container>
        


    </>)
}

export default Details;