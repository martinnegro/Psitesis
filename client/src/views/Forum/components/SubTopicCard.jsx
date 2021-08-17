import React from 'react'
import {Container, Typography, makeStyles,Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyle = makeStyles({
    link: {
        textDecoration: "none",
    },
    title:{
        fontSize: "1.5rem",
        padding: "20px"
    },
    secondary:{
        fontSize: "1rem",
        padding: "20px"
    }
});

const SubTopicCard = ({id,name,description}) =>{
    const classes = useStyle();

    return(
<Container className = {classes.container}>
    <Link className={classes.link} to = {`/forum/subtopic/${id}`}>
<Typography className = {classes.title} variant='h3' color="textPrimary" >{name}</Typography>
<Typography className = {classes.secondary} variant='h4' color = "textSecondary" >{description}</Typography>
</Link>
<Divider></Divider>

</Container>
    )
}

export default SubTopicCard