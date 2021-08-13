import React from 'react'
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green } from '@material-ui/core/colors';
import user from '../../assets/user.jpg'
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

export default function Institutions({id,instName,imageProfile,bio}){
    const classes = useStyles();
    return(
        <Link href = {`/institution/${id}`}  color = "inherit">
        <Container className = {classes.container2} width={20}  >
 <div className = {classes.root}>
<Avatar variant="square" src = {imageProfile} className={classes.square}>  </Avatar>
</div>
<div className = {classes.text}>
<h3>{instName}</h3>
{/* <h3>Bio</h3> */}
{bio}
<Divider style = {{width: "300px"}} />
</div>
</Container>
        </Link>
    )
}
