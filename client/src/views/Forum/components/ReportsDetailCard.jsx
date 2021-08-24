import React from 'react'
import { makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container } from '@material-ui/core/'
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  function createData(usuario, motivo, resolver, eliminar) {
    return { usuario, motivo, resolver, eliminar };
  }
  
const ReportDetailCard = ({userReporting,reason}) =>{

    const classes = useStyles();
    return(
        <Container>
           <h3>{userReporting}</h3>
           <h4>{reason}</h4>
        </Container>
    )
}

export default ReportDetailCard