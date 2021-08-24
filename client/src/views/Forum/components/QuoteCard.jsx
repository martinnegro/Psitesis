import React from "react"
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Typography, makeStyles, Box,Container,Paper } from '@material-ui/core'
const useStyle = makeStyles({
    root: {
        margin: "60px auto 0 auto",
        width: "1000px",

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
        fontSize: "1.5rem",
        textAlign: "start",
    },
    footer: {
        margin: "5px 0 0 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    user: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        margin: "0 5px 0 5px",
        width: "2rem",
        height: "2rem"
    },
    info: {
        margin: "10px 0 10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    iconsContainer:{
        display: "flex",
        justifyContent :"center",
        margin: "20px"
    },
    iconContainer:{
        margin: "10px",

    },
    contentContainer : {
        margin: "35px"
    },
    links:{
        color: "inherit",
        styles: "none",
        textDecoration: "none"
    },
    buttonContainer:{
       height: "2px"
    },
    paperContainer:{
        margin: "10px",
        padding: "10px"
    },
    link:{
        color: "inherit",
        styles: "none",
    }
});

const QuoteCard = ({userName,commentContent,commentId}) =>{
    const classes = useStyle();
    return(
        
        <Container className = {classes.contentContainer}>
            <Typography className={classes.autor} color="textSecondary">
             <span> {userName} <a className = {classes.link} href = {`#${commentId}`} >comento: </a> </span>
                        </Typography>
            
            <Paper className = {classes.paperContainer}>
            <span
              dangerouslySetInnerHTML={{
                __html: `${commentContent}`,
              }}
            />
            </Paper>
        </Container>
    )
}

export default QuoteCard