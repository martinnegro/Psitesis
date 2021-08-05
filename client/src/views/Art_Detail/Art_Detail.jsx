import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getArticleDetail, clearDetail, getAllUsers } from "../../redux/actions/actions";
import { useParams, useHistory } from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";
import s from './Art_Detail.module.css'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    Home: {
        // marginLeft: theme.spacing(15),
        margin: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}))

const Art_Detail = () => {

const { id } = useParams();

  const dispatch = useDispatch();
  const articlesDetail = useSelector((state) => state.articlesDetail);
  const users = useSelector(state => state.users)
  const [idUser, setIdUser] = useState([])

  const classes = useStyles()    
  console.log('idUser:',idUser)



  useEffect(() => {
    dispatch(getArticleDetail(id));
    return () => dispatch(clearDetail());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllUsers())
}, [dispatch])

useEffect(() => {
   setIdUser(users?.filter(u => u.user_id === articlesDetail?.user_id))
}, [articlesDetail?.user_id, users])

  console.log('articlesDetail:', articlesDetail)

    return ( 
        <Container>
            <div className={classes.offset}></div>
            <Nav />
            {
                articlesDetail !== undefined ? (
                    <Container className={classes.Home}>
                    <Typography>{articlesDetail?.art_date}</Typography>
                    <Typography>{idUser[0]?.user_name}</Typography>
                    <Typography>{articlesDetail.art_title}</Typography>
                    <Typography variant="body2" component="p"><span
                            dangerouslySetInnerHTML={{
                                __html: articlesDetail.art_contents,
                            }}
                    /></Typography>
                    </Container>
                ) : <div className={`${s.lds_ring} ${s.centrar}`}><div></div><div></div><div></div><div></div></div>
            }
        </Container> 
    );
}
 
export default Art_Detail;