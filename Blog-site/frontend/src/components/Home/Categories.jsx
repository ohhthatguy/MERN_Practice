import { TableRow,Table,TableBody,TableCell,TableHead, styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
    border: 1px solid black;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`
const Categories = ()=>{

    const category = [
        {id: 1, category: "Music"},
        {id: 2, category: "Movie"},
        {id: 3, category: "Science"},
        {id: 4, category: "Sports"},
        {id: 5, category: "Games"}
    ]
        

    return (<>

        <StyledTable>
            <TableHead>
                <TableRow>
                    <StyledLink to='/'>
                        <TableCell>
                            All Catagory
                        </TableCell>
                    </StyledLink>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    category.map((e)=>(
                        <TableRow key={e.id}>
                            <StyledLink to={`/?category=${e.category}`}>
                                <TableCell>
                                        {e.category}
                                </TableCell>
                            </StyledLink>
                        </TableRow>
                    ))   
                } 
            </TableBody>
        </StyledTable>

    </>)

}

export default Categories