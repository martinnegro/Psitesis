import React from 'react'
import {Container, Card, CardContent, Avatar, Typography, makeStyles, Box,Divider } from '@material-ui/core'

const useStyle = makeStyles({
    root: {
      minWidth: 400,
      maxWidth: 500,
      margin: 'auto',
      flexGrow: '1',
      flexBasis: '0'
      
    },
    header: {
      fontSize: "1rem",
      display: "flex",
      justifyContent: "space-between"
    },
    link: {
        textDecoration: "none"
    },
    title: {
        fontSize: "2rem",
        textAlign: "start",
        color: '#861C55',
        padding: "20px"
    },
    divider:{
        background: "#861C55",
    }
});


const TopicCard = ({id,name}) =>{
    const classes = useStyle();

    return(
<Container>
<Typography className={classes.title} >{name}</Typography>
<Divider className = {classes.divider}></Divider>
</Container>
    )
}

export default TopicCard