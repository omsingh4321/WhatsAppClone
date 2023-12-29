import { useContext } from "react";
import { Box, styled,InputBase } from "@mui/material";
import Header from "./Header";
import Search from "./Search";



const Menu=()=>{

    return(
        <>
          <Box>
            <Header/>
            <Search/>
          </Box>  

        </>
    )

}
export default Menu;