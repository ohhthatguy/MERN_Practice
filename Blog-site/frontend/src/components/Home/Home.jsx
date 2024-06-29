import React,{useState} from 'react'
// import { DataContext } from '../../context/DataProvider'
import Banner from './Banner'
import Categories from './Categories'
import { Grid, Button, Typography, styled } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import UserPost from './Post/UserPost'

const StyledGrid = styled(Grid)`
border: 1px solid black;
    padding: 10px;
`
 

const Home = () => {

    const [searchParams] = useSearchParams()
    const selectedCategory = searchParams.get('category');
    
   

  return (
    <>
        <Banner  />
        {/* container means parent and item means the child */}
        <Grid container > 
            <Grid item xs={12} sd={2} md={2}>

              <Typography>Select a category</Typography>

                <Categories />

                <Link to={`/create/?category=${selectedCategory || 'all'}`}>
                <Button variant='contained' >Create</Button>
              </Link>
            </Grid>

            <StyledGrid container xs={12} sd={10} md={10} >
              <UserPost />
            </StyledGrid>

        </Grid>
        
      
    </>
  )
}

export default Home