import React from "react"
import { Link } from 'react-router-dom'
import { Card, CardContent, Avatar, Typography, makeStyles, Box,Container,Paper } from '@material-ui/core'
const useStyle = makeStyles({
    root:{
        width: "80%",
        padding: "5px",
        margin: "3px auto 0 auto"
    },
    autor: {
        fontSize: "0.95rem"
    }
});

const QuoteCard = ({userName,commentContent,commentId}) =>{
    const classes = useStyle();
    return(
        <Paper 
            className={classes.root}
            variant="outlined"
        >
            <Typography
                className={classes.autor}
                color="textSecondary"
            >
                <span>En respuesta a {userName} </span>
            </Typography>
            "
            <span
              dangerouslySetInnerHTML={{
                __html: `${commentContent}`,
              }}
            />
            "
        </Paper>
        
    )
}

export default QuoteCard