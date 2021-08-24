import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useSelector, useDispatch } from "react-redux";

import {
  getArticleDetail,
  clearDetail,
} from '../../redux/actions/actionsArticles';
import {
  getAllUsers
} from '../../redux/actions/usersActions';
import {
  deletePost,
  getAllCatSub,
} from "../../redux/actions/actions";
import { useHistory, useParams } from "react-router-dom";
import { Container, makeStyles, Typography, Button } from "@material-ui/core";
import s from "./Art_Detail.module.css";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



//Modal confirmacion eliminar
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//MOdal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//Menucito
import NavBottom from "../../components/NavBottom/NavBottom";




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
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid purple",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "10%",
  },
  Home: {
    margin: theme.spacing(1),
    marginTop: '15px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tipoh2: {
    "@media (max-width: 601px)": {
      marginTop: 15,
      fontSize: "1.75rem",
      marginBottom: 10,
    },
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

  const dispatch = useDispatch();
  const articlesDetail = useSelector((state) => state.articlesReducer.articlesDetail); // Nueva forma de acceder al estado por combineReducer
  const user = useSelector((state) => state.authReducer.user); // Nueva forma de acceder al estado por combineReducer
  const users = useSelector((state) => state.usersReducer.users);
  const [idUser, setIdUser] = useState([]);
  const subcategories = useSelector((state) => state.rootReducer.cat_sub?.sub_cats);
	const [enablePost, setEnablePost] = useState(false);

  const history = useHistory();

  const classes = useStyles();



  useEffect(() => {
    dispatch(getAllCatSub())
    }, [dispatch]);

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


  // useEffect(() => {
  //   setSection(subcategories?.filter((c) => c.sub_cat_id === articlesDetail?.Subcategories[0]?.sub_cat_id));
  // }, [articlesDetail?.Subcategories, subcategories]);

	useEffect(() => {
		if (articlesDetail && user) {      
			if (articlesDetail.user_id === user.user_id || user.roles.includes('admin') || user.roles.includes('superadmin')) {
					setEnablePost(true);
			} else {
        setEnablePost(true);
      }
		}
	}, [articlesDetail, history, user]);

  const deletePostHandler = async () => {  
    dispatch(deletePost(id))
  }

  const editArticle = () => {
    history.push('/postEdit/'+ id);
  }

  //Modal constantes:
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deletePostHandler();
    setOpen(false);
    setTextModal('eliminado')
    setOpen2(true);
    setTimeout(handleClose2, 1000);
  };

  //Modal
  const [open2, setOpen2] = React.useState(false);

  // const handleOpen2 = () => {
  //   setOpen2(true);
  // };

  const handleClose2 = () => {
    setOpen2(false);
    history.push("/home");
  };

  //Texto Modal
  const [textModal, setTextModal]= useState('')


  return (
    <Container>
       <ThemeProvider theme={theme}>       
      <div className={classes.offset}></div>
      <Nav />
      <Container className={classes.Home}>
      {articlesDetail !== undefined ? (
        <Container className={classes.Home}>
          <div className={s.perfil} style={{fontSize: 10}}>
            <div>
              <Typography variant="p" >
                Sección: {articlesDetail?.subcategory?.sub_cat_name}
              </Typography>
            </div>
            <div className={s.perfil2} >
              <Typography variant="p">{idUser[0]?.user_name}</Typography>
              &nbsp;
              <Typography variant="p">el {articlesDetail?.art_date}</Typography>
            </div>
          </div>
{enablePost ? <div className={s.btns}>
           <Button 
           startIcon={<DeleteIcon />}
           variant="contained"
              size="medium"
              color="primary"
              classes={{
                root: classes.root,
                label: classes.label,
              }} onClick={handleClickOpen}>
                Eliminar
              </Button>
              <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">ELIMINAR ARTICULO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas seguro que quieres eliminar el articulo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
              &nbsp;
              &nbsp;
              <Button 
              startIcon={<EditIcon />}
              size="medium"
              color="primary"
              classes={{
                root: classes.root,
                label: classes.label,
              }} onClick={editArticle}>
                Editar
              </Button>
           </div>  : null}         
          
          <Typography variant="h2" color="initial" className={classes.tipoh2}>
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
      <div>
            {/* <button type="button" onClick={handleOpen2}>
        algo
      </button> */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open2}
              onClose={handleClose2}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open2}>
                <div className={classes.paper2}>
                  <p id="transition-modal-description">Articulo {textModal}</p>
                </div>
              </Fade>
            </Modal>
          </div>
          </Container>
      </ThemeProvider>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </Container>
  );
};

export default Art_Detail;
