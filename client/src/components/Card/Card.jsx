import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/actions';

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
    }
  });

export default function CardPost (props) {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
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
                <Typography className={classes.title} color="textSecondary" gutterBottom>{title}</Typography>
                <Typography variant="body2" component="p" style={{height: '50px'}}>
                  {articleAbstract}
                  {/* <span
                      dangerouslySetInnerHTML={{
                        __html: body,
                      }}
                  /> */}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardContents}>
                <Typography component="p" >{idUser[0]?.user_name}</Typography>
                <Button  size="small"  onClick={() => history.push(`/post/${articleId}`)} ><AddIcon/></Button>
            </CardActions>
        </Card>
    )
}
