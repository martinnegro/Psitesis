import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getArticleDetail,
	clearDetail,
} from '../../redux/actions/actionsArticles';
import {
	createPost,
	editPost,
	getAllCatSub,
} from '../../redux/actions/actions';
import Nav from '../../components/Nav/Nav';
import { useHistory, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
//import Divider from "@material-ui/core/Divider";
import { ThemeProvider } from '@material-ui/core/styles';
import './Post.css';
import style from './Post.module.css';
//MODAL
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Selectores from '../../components/Select/Select';
//menucito
import NavBottom from "../../components/NavBottom/NavBottom";
import Container from "@material-ui/core/Container"; 
//validation
import { minLengthValidation } from "../../utils/validations/formValidations";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
		secondary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
	},
});

const useStyles = makeStyles({
	offset: theme.mixins.toolbar,
	root: {
		'color': '#ffffff',
		'backgroundColor': purple[500],
		'&:hover': {
			backgroundColor: purple[700],
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '80%',
	},
	paper2: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '10%',
	},
	Home: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipoh2: {
		'@media (max-width: 601px)': {
			marginTop: 0,
			fontSize: '1.75rem',
			marginBottom: '10px',
		},
	},
	anchoInput: {
		'marginTop': 20,
		'width': '50vw',
		'@media (max-width: 601px)': {
			width: '80vw',
		},
	},
});

function Post() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const articlesDetail = useSelector(
		(state) => state.articlesReducer.articlesDetail
	);
	const { user }= useSelector((state) => state.authReducer);

	const classes = useStyles();

	const [enablePost, setEnablePost] = useState(false);
	const [body, setBody] = useState('');
	const [titulo, setTitulo] = useState('');
	const [reseña, setReseña] = useState('');
	const [subcategoria, setSubcategoria] = useState(null);
	const [categoria, setCategoria] = useState(null);
	const [tags, setTags] = useState('');

//validation...
  const [formValid, setformValid] = useState({
    titulo:false,
    reseña:false,
    subcategoria:false,
    categoria:false,
    tags:false
  });

  const [openSnack, setOpenSnack] = React.useState(false);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  //....validation
  
  //MOdal
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = React.useState("1");
	const handleOpen = () => {
		setOpen(true);
		setOn('0');
	};

	const handleClose = () => {
		setOpen(false);
		setOn('1');
	};

	const history = useHistory();

	const hoy = new Date(Date.now());
	const date = hoy.toLocaleDateString();

	const handleBody = (e) => {
		setBody(e);
	};

  const handleInput = (e) => {
    setTitulo(e.target.value);
    const {name, type} = e.target;

    if(type === 'text'){
      setformValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 3)
      })
    }
  };

  const handleInputReseña = (e) => {
    setReseña(e.target.value);
    const {name, type, value} = e.target;
// console.log('target',e.target.value);

    if(type === 'text'){
      setformValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 3)
      })
    }
  };

  const handleInputTags = (e) => {
    setTags(e.target.value);

    const {name, type} = e.target;

    if(type === 'text'){
      setformValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 3)
      })
    }
  };

  const handleInputCat = (e) => {
    let index = e.target.selectedIndex;
    let option = e.target.options[index].value;
    console.log("option: ", option);

    setCategoria(option.split("/")[0]);
    setSubcategoria(option.split("/")[1]);


    const {name, type} = e.target;

    if(type === 'text'){
      setformValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 3)
      })
    }
  };

  const inputsValidations = e=>{
    console.log(e.target);
  }

  const handleSubmitBody = async (e) => {
    e.preventDefault();
    const tituloVal = titulo;
    const reseñaVal = reseña;
    const bodyVal = body;
    const tagsVal = tags;
    if(tituloVal.length===0 || tagsVal.length ===0 || reseñaVal.length === 0 || bodyVal.length === 0 ){
      setOpenSnack(true)
    } else {
		  let data = {
		  	art_contents: body,
		  	art_title: titulo,
		  	// cat_id: categoria,
		  	sub_cat_id: subcategoria,
		  	user_id: user.user_id,
		  	art_abstract: reseña,
		  	art_date: date,
		  	art_tags: tags.split(',').map((e) => e.trim()),
		  	art_id: id ? articlesDetail.art_id : null,
		  };
      console.log("data: ", data);
      // action createPost or editPost
	    if (id) {
		    dispatch(editPost(data));
		    setBody('');
		    setTitulo('');
		    setTextModal('editado');
		    setOpen2(true);
		    setTimeout(handleClose2, 1000);
	    } else {
		    dispatch(createPost(data));
		    setBody('');
		    setTitulo('');
		    setTextModal('creado');
		    setOpen2(true);
		    setTimeout(handleClose2, 1000);
	    }
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
	if (id) {
		dispatch(getArticleDetail(id));
	}
	return () => dispatch(clearDetail());
}, []);

useEffect(() => {
	if (articlesDetail && user && id) {
		setBody(articlesDetail.art_contents);
		setTitulo(articlesDetail.art_title);
		setReseña(articlesDetail.art_abstract);
		setSubcategoria(articlesDetail.sub_cat_id);
		if (
			articlesDetail.user_id === user.user_id ||
			user.roles.includes('admin') ||
			user.roles.includes('superadmin')
		) {
			setEnablePost(true);
		} else {
			history.push('/');
			setEnablePost(true);
		}
	}
}, [articlesDetail, history, id]);

useEffect(() => {
	dispatch(getAllCatSub());
}, []);

	//Modal
	const [open2, setOpen2] = React.useState(false);

	// const handleOpen2 = () => {
	//   setOpen2(true);
	// };

	//Texto Modal
	const [textModal, setTextModal] = useState('');

  const handleClose2 = () => {
    setOpen2(false);
    history.push("/home");
  };


  return (
    <div>
      <div className={classes.offset}></div>
      <Nav />
      <ThemeProvider theme={theme}>
        {/* <header className={`${style.contenedor_editor} ${style.centrado}`}> */}
        <Container className={classes.Home}>
          <Typography variant="h2" color="initial" className={classes.tipoh2}>
            NUEVO POST ARTICULO
          </Typography>
          <br />
          <div className={style.botones}>
            <TextField
              id="standard-basic"
              label="Titulo"
              name="titulo"
              type="text"
              value={titulo}
              onChange={handleInput}
              required
            />
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <FormControl>
              <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
              <Select
                native
                defaultValue=""
				value={subcategoria}
                id="grouped-native-select"
                onChange={handleInputCat}
                required
              >
               <option aria-label="None" value={-1}>Ninguna</option>
                <Selectores />
              </Select>
            </FormControl>
          </div>
          <br />
            <TextField
              id="outlined-full-width"
              label="Reseña"
              style={{ marginTop: 20 , maxWidth: '70%'}}
              placeholder="Placeholder"
              helperText={`Disponible - ${120 - reseña.length} caracteres`}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="reseña"
              type="text"
              value={reseña}
              onChange={handleInputReseña}
              inputProps={{
                maxLength: 120,
              }}
              required
              rows={3}
              multiline
            />
          <br />
          <br />
          <ReactQuill
            placeholder="Escribe aqui ...."
            modules={Post.modules}
            formats={Post.formats}
            onChange={handleBody}
            value={body}
          />
          <br />
          <div>
            <TextField
              id="outlined-full-width"
              label="Tags"
              placeholder="Placeholder"
              helperText="Ingresa tags separados por coma ','"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="tags"
              type="text"
              value={tags}
              onChange={handleInputTags}
              className={classes.anchoInput}
              required
            />
          </div>
          <br />
          <br />
          <div className={style.botones}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleOpen}
              classes={{
                root: classes.root,
                label: classes.label,
              }}
            >
              VISTA PREVIA
            </Button>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <Typography>{titulo}</Typography>
                    <br />
                    <Typography variant="body2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${body}`,
                        }}
                      />
                    </Typography>
                  </div>
                </Fade>
              </Modal>
            </div>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSubmitBody}
              classes={{
                root: classes.root,
                label: classes.label,
              }}
            >
              {id ? "EDITAR POST" : "POSTEAR"}
            </Button>
            <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error">
          Debe completar todos los campos!
        </Alert>
      </Snackbar>
          </div>
          <div>
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
                  <p id="transition-modal-description">Artículo {textModal}</p>
                </div>
              </Fade>
            </Modal>
          </div>
          </Container>
        {/* </header>         */}
      </ThemeProvider>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </div>
  );
}

Post.modules = {
	toolbar: [
		[{ header: '1' }, { header: ['2', '3', '4', '5', '6'] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image'],
		[{ align: [] }],
		[{ color: [] }],
	],
};

Post.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'align',
	'color',
];

export default Post;