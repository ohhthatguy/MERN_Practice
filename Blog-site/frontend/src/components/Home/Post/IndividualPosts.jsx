import { Box,Typography,styled, } from "@mui/material"

const Container = styled(Box)`
   border: 1px solid red;
    display: flex;
    align-items: center;
    height: 250px;
    flex-direction: column;
    padding: 10px;
    margin-left: 10px;
`
const Image = styled('img')`
    width: 100%;
    height: 20vh;
    object-fit: cover;
    object-position: 50% 25%;

`


const IndividualPosts = ({post})=>{
    const imgUrl =post.image ? post.image :  'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    return (<>
    
         <Container>
            <Image src={imgUrl} alt="cover image" />
            <Typography>{post.category}</Typography>
            <Typography>{post.title}</Typography>
            <Typography>{post.name}</Typography>
            <Typography>{post.description}</Typography>
        </Container>
   
    </>)
}

export default IndividualPosts