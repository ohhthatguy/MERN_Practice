import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const EditedToolBar = styled(Toolbar)`
    gap: 2rem;
    justify-content: center;
    align-items: center;
    
    & >a{
    color: white;
    text-decoration: none;
    }
    
`

const Header = ()=>{

    return (<>

    <AppBar>
        <EditedToolBar>
            <Link to='/' >Home</Link>
            <Link to='/'>About</Link>
            <Link to='/'>Contact</Link>
            <Link to='/logIn'>LogOut</Link>
        </EditedToolBar>
    </AppBar>
    
    </>)
}

export default Header