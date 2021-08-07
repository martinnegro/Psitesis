import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";

import {
  getArticleDetail,
  clearDetail,
  getAllUsers,
  deletePost,
  editPost
} from "../../redux/actions/actions";
import { useHistory, useParams } from "react-router-dom";
import { Container, makeStyles, Typography, Button } from "@material-ui/core";
import s from "./Art_Detail.module.css";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  Home: {
    // marginLeft: theme.spacing(15),
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    color: "#ffffff",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid purple",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
    secondary: {
      main: purple[500],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
  },
});

const Art_Detail = () => {
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();
  const articlesDetail = useSelector((state) => state.articlesDetail);
  const users = useSelector((state) => state.users);
  const [idUser, setIdUser] = useState([]);

  const history = useHistory();

  const classes = useStyles();

  const subCats = [
    { name: "Metodologia de investigación", id: 1 },
    { name: "Elección de tema", id: 2 },
    { name: "Citado en el texto", id: 3 },
    { name: "Referencias bibliográficas", id: 4 },
  ];

  useEffect(() => {
    dispatch(getArticleDetail(id));
    return () => dispatch(clearDetail());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setIdUser(users?.filter((u) => u.user_id === articlesDetail?.user_id));
  }, [articlesDetail?.user_id, users]);

  const [section, setSection] = useState([]);

  useEffect(() => {
    setSection(subCats.filter((c) => c.id === articlesDetail?.sub_cat_id));
  }, [articlesDetail?.sub_cat_id]);

  
  const deletePostHandler = async () => {  
    const token = await getAccessTokenSilently();
  
    dispatch(deletePost(id, token))
  }

  const editArticle = () => {
    history.push('/postEdit/'+ id);
  }

  return (
    <Container>
       <ThemeProvider theme={theme}>

       
      <div className={classes.offset}></div>
      <Nav />
      {articlesDetail !== undefined ? (
        <Container className={classes.Home}>
          <div className={s.perfil}>
            <div>
              <Typography variant="body2">
                Sección: {section[0]?.name}
              </Typography>
            </div>
            <div className={s.perfil2}>
              <Typography variant="body2">{idUser[0]?.user_name}</Typography>
              &nbsp;
              <Typography variant="body2">el {articlesDetail?.art_date}</Typography>
            </div>
          </div>
         <div className={s.btns}>
           <Button variant="contained"
              size="medium"
              color="primary"
              classes={{
                root: classes.root,
                label: classes.label,
              }} onClick={deletePostHandler}>
                Eliminar
              </Button>
              &nbsp;
              &nbsp;
              <Button size="medium"
              color="primary"
              classes={{
                root: classes.root,
                label: classes.label,
              }} onClick={editArticle}>
                Editar
              </Button>
           </div> 
          
          <Typography variant="h2" color="initial">
            {articlesDetail.art_title}
          </Typography>
          <br/>
          <Typography align='justify' variant="body2" component="p">
            <span
              dangerouslySetInnerHTML={{
                __html: articlesDetail.art_contents,
              }}
            />
          </Typography>
        </Container>
      ) : (
        <div className={`${s.lds_ring} ${s.centrar}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      </ThemeProvider>
    </Container>
  );
};

export default Art_Detail;
