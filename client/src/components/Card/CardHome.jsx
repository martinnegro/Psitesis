import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, rgbToHex, withStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/actions';
import { purple, lime, grey } from '@material-ui/core/colors';


import { getAllUsers } from '../../redux/actions/usersActions';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '30%',
        flexDirection: 'row',
        margin: '10px',
        maxHeight: '205px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 16,
    },
    pos: {
      marginBottom: 12,
    },
    cardContents:{
      display : 'flex',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    content: {
      color: lime[800]
    },
    text2: {
      color: lime[700]
    }
  });


  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lime[900]),
      //color: lime[700],
      //borderColor: lime[600],
      fontSize: '10px',
     backgroundColor: lime[600],
      '&:hover': {
        backgroundColor: lime[800],
      },
     },
  }))(Button);

export default function CardPost (props) {

    const dispatch = useDispatch()
    const users = useSelector(state => state.usersReducer.users) // Nueva forma de acceder al estado por combineReducer
    const history = useHistory()
    const [idUser, setIdUser] = useState([])

    const classes = useStyles();

    const { title, body, id, articleId, articleAbstract } = props

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
       setIdUser(users?.filter(u => u.user_id === id))
    }, [id, users])

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography 
                className={classes.title} 
                gutterBottom                
                >{title}</Typography>
                <Typography 
                variant="body2" 
                component="p" 
                style={{height: '85px'}} 
                className={classes.content} >
                  {articleAbstract}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardContents}>
                <Typography 
                component="p" 
                className={classes.text2}
                >{idUser[0]?.user_name}</Typography>
                <ColorButton   
                  size="small"  
                  onClick={() => history.push(`/post/${articleId}`)} 
                  endIcon={<AddIcon/>}
                  variant="contained"
                  //variant="outlined"
                  >VER</ColorButton >
            </CardActions>
        </Card>
    )
}
