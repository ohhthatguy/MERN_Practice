import {useState, useEffect, useContext} from 'react'
import {Box,Typography,styled, TextareaAutosize, Button } from '@mui/material'
import {Person} from '@mui/icons-material';
import { API } from '../../services/Api';
import { Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import IndividualComment from './IndividualComment';

const Container = styled(Box)`
    margin: 50px 0;
    // border: 1px solid black;
`
const StyledTextareaAutosize = styled(TextareaAutosize)`
    width: 100%;
    padding: 5px 10px;
`
const InputComment = styled(Box)`
    display: flex;
`
const ShowComment = styled(Box)`
    
    // border: 1px solid black;
    margin: 20px 50px;
    width: 85%;
    box-shadow: 1px 1px 1px 1px black;

`

const StyledButton = styled(Button)`
    align-self: center;
`
const Comment = ({post})=>{
    const {account} = useContext(DataContext)
    const [toggle,setToggle] = useState(false)
    
        const initialComment = {
            name: '',
            postId: '',
            comment: '',
            createdDate: new Date()
        }
        const [comment, setComment] = useState(initialComment);
        const [fetchedComment, setFetchedComment] = useState();

        const saveComment = async()=>{
                // console.log(comment)
                const postComment = await API.postComment(comment)
                if(postComment.isSuccess){
                    setComment(postComment.data)
                    setToggle(prev=> !prev)
                    setComment({...comment, comment: ''})
                    console.log("save comment succefully")

                }else{
                    console.log("something went wrong while saving comments")
                }
        }

        
       

    useEffect(()=>{
           
        const fetchComment = async()=>{
            try{
                let data = await API.getAllComments(post?._id)
                
                if(data.isSuccess){
                    setFetchedComment(data.data)
                    console.log("comments are fetchd")
                }else{
                    console.log('something went wrong while gettinf comments')
                }
            }catch(err){
                console.log("Im here at error of fetchcomment func in frontend")
                console.log(err)
            }
            
        }
            fetchComment()

        },[post?._id, toggle])


    return (<Container>
        <InputComment>

            <Person  fontSize="large"/>
           <StyledTextareaAutosize value={comment.comment} onChange={(e)=> setComment({...comment, comment: e.target.value, postId: post?._id, name: account.name})} placeholder='whats on your mind ?' minRows={4} />
           <StyledButton variant='contained' onClick={()=> saveComment() } disabled = {((comment.name) && (comment.postId) && (comment.comment) && (comment.createdDate)) ? false : true}>Comment</StyledButton>

        </InputComment>

       
            {
               (fetchedComment && fetchedComment.length > 0) ? fetchedComment.map((e)=>(
                    <ShowComment>
                       <IndividualComment comment={e} setToggle={setToggle}/>
                       </ShowComment>
                )) : <Box>no comments until now</Box>
            }
       
       
    </Container>)
}

export default Comment;