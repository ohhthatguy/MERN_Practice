import { Box,Typography,styled, } from "@mui/material"

const Container = styled(Box)`
   border: 1px solid red;
    display: flex;
    align-items: center;
    height: 250px;
    flex-direction: column;
    padding: 10px;
    margin-left: 10px;
    word-break: break-word;
`
const Image = styled('img')`
    width: 100%;
    height: 20vh;
    object-fit: cover;
    object-position: 50% 25%;

`


const IndividualPosts = ({post})=>{
    const imgUrl =post.image ? post.image :  'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    const truncateSentence = (sentence)=> {
        if (sentence.length > 30) {
            return sentence.slice(0, 30 - 3) + '...';
        }
        return sentence;
    }

    let truncated_title = truncateSentence(post.title)
    let truncated_description = truncateSentence(post.description)


    return (<>
    
         <Container>
            <Image src={imgUrl} alt="cover image" />
            <Typography>{post.category}</Typography>
            <Typography>{truncated_title}</Typography>
            <Typography>{post.name}</Typography>
            <Typography>{truncated_description}</Typography>
        </Container>
   
    </>)
}

export default IndividualPosts