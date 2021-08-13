
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root2: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  text:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  container:{
      display: "flex",
      color: "red",
      flexDirection : "row",
  },
  container2:{
      display: "flex",
      
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));
export default function BiosContainer({id,userName,biography,imgProfile}){
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    
    return(
            <Link href = {`/user/${id}`} /* onClick = {preventDefault} */ color = "inherit">
                <Container className = {classes.container2} width={20}  >
                 <div className = {classes.root}>
            <Avatar variant="square" src = {imgProfile} className={classes.square}>  </Avatar>
            </div>
            <div className = {classes.text}>
                <h3>{userName}</h3>
                <h3>Bio</h3>
                {biography}
                <Divider style = {{width: "300px"}} />
                </div>
                </Container>
                </Link>              
    )
}

