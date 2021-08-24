import React from 'react'
import { makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container } from '@material-ui/core/'
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    container:{
      display: "flex",
      justifyContent: "center"
      
    }
  });
  
  
const ReportDetailCard = ({userReporting,reason}) =>{

    const classes = useStyles();
    return(
        <Container className = {classes.container}>
           <h3>{userReporting}</h3>
           <h4>{reason}</h4>
        </Container>
    )
}

export default ReportDetailCard