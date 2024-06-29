import { useState, useEffect } from "react"
import { API } from "../../../services/Api"
import { Grid } from "@mui/material"
import IndividualPosts from "./IndividualPosts"
import {useSearchParams, Link} from 'react-router-dom'




const UserPost = () =>{

    const [posts, setPosts] = useState([])
    const [searchParams] = useSearchParams()

    let category = searchParams.get('category')

    useEffect(()=>{
        const fetchPosts = async()=>{

            try{
                let response;
               if (category){
                response = await API.getAllPosts({category: category})
                console.log("Im here," + category)
               }else{
                response = await API.getAllPosts({})
                // console.log("Im here at normal")

               }
                 
                if(response.isSuccess){
                    setPosts(response.data)
                }
                
            }catch(err){
                console.log(`error occured while fetching the posts: ${err}`)
            }
        }
        fetchPosts()

    },[category])
    


    return (<>{

        (posts && posts.length >0) ? posts.map((e)=>(
       
                    <Grid key={e._id} item lg={3} sd={4} xs={12} >
                        <Link to={`/detail/${e._id}`}>
                            <IndividualPosts post={e} />
                       </Link>

                    </Grid>

        )) : <div>no posts to fetch</div>
    }
        
    </>)
}

export default UserPost