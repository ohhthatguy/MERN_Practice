import React,{useState} from 'react'
// import { DataContext } from '../../context/DataProvider'
import Banner from './Banner'
import Categories from './Categories'
import { Grid, Button, Typography, styled } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'


  const StyledGrid = styled(Grid)`
  border: 1px solid black;
  `

const Home = () => {
    // const {account} = useContext(DataContext)
    const [searchParams] = useSearchParams()
    const selectedCategory = searchParams.get('category');
    
   

  return (
    <>
        <Banner  />
        {/* container means parent and item means the child */}
        <Grid container> 
            <Grid item xs={3} sd={2} md={2}>

              <Typography>Select a category</Typography>

                <Categories />

                <Link to={`/create/?category=${selectedCategory || 'all'}`}>
                <Button variant='contained' >Create</Button>
              </Link>
            </Grid>
            <StyledGrid item xs={9} sd={10} md={10}>
                <Typography>Posts</Typography>
            </StyledGrid>

        </Grid>
        
      
    </>
  )
}

export default Home