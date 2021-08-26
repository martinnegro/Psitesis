import React from 'react'
import {
    Box,
    IconButton,
    Link,
    Table,
    TableCell,
    TableRow,
    TableFooter,
  } from "@material-ui/core";
  import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const ChangeNickName = () =>{
    return(
<TableFooter align="center">
              <TableCell align="center">
                Cambiar Nick
                <IconButton
                  align="center"
                  /* onClick={() => setIsCreating(true)} */
                  style={{ /* color: purple[500], */ height: "42px", width: "42px" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableFooter>
    )
}

export default ChangeNickName