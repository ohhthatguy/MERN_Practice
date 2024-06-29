import {Box,styled } from '@mui/material'
import { Delete } from '@mui/icons-material';
import {Person} from '@mui/icons-material';
import { API } from '../../services/Api';

import { DataContext } from '../../context/DataProvider';
const StyledHalfContainer = styled(Box)`
    position: relative;
    // border: 1px solid red;
    padding: 5px;
    margin-bottom: 10px;
    box-shadow: 1px 0.5px 1px 0.6px black;
`


const StyledBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: bolder;
`

const StyledDate = styled(Box)`
    font-size: smaller;
    font-weight: bolder;
    margin-left: 35px;
`

const IndividualComment = ({comment, setToggle})=>{

    const deleteComment =async()=>{
            try{
                let response = await API.deleteComment(comment._id)

                if(response.isSuccess){
                    console.log("data is  delted from frontend")
                    setToggle(prev=> !prev)
                }

            }catch(err){
                console.log(`error while deleting comments, ${err}`)
            }
    }


    return (<>
        <StyledHalfContainer>
            <StyledBox>
                <Box sx={{display: "flex;", alignSelf: "center;", gap: "10px;"}}>
                    <Person  fontSize='medium'/>
                    {comment.name}
                </Box>
                    <Delete onClick={()=> deleteComment()}/>
            </StyledBox>
            <StyledDate>{comment.createdDate} </StyledDate>
         
    
       
        </StyledHalfContainer>

       <Box sx={{marginLeft: "40px;", fontSize: "1.25rem;"}}>{comment.comment}</Box> 
  
    </>)
}

export default IndividualComment