import { Box, styled } from "@mui/material";


const Image = styled(Box)`
    // border: 1px solid black;
    background: url(https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    height: 40vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #000;

    display: flex;
    justify-content: center;
    align-items: center;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 2rem;

`

const Banner = ()=>{

    return (<>
    <Image>
        Hello from Banner
    </Image>
    </>)
}

export default Banner;