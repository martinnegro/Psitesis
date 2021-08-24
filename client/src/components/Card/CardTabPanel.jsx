import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/usersActions';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 500,
    margin: '20px',
    height: 210,
    "@media (max-width: 601px)": {
      // margin: '0px',
      minWidth: 325,
      maxWidth: 325,
      height: 210,
      marginLeft: '-24px',
      display:'block',
      overflowX: "auto",
      width:'100%'
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
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
  button:{
    color: 'white',
    backgroundColor: '#031927',
      '&:hover': {
        backgroundColor: '#010b12',
    }
  }
});

export default function CardTabPanel (props) {

  const { title, abstract, date, body, id, userId } = props;
  const users = useSelector(state => state.usersReducer.users)
  const [idUser, setIdUser] = useState([])
  const dispatch = useDispatch()

  const classes = useStyles();
  const history = useHistory()
  
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
     setIdUser(users?.filter(u => u.user_id === userId))
  }, [userId, users])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {date}
        </Typography>
        <Typography variant="body2" component="p" style={{height:'60px'}}>
          {abstract}
          <br />
        </Typography>
      </CardContent>
      <CardActions className={classes.cardContents}>
      <Typography component="p" >{idUser[0]?.user_name}</Typography>
      <Button 
      className={classes.button}  
      size="small"  
      onClick={() => history.push(`/post/${id}`)}
      endIcon={<AddIcon/>}
      >VER</Button>
      </CardActions>
    </Card>
  );
}
