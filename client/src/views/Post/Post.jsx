import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPost,
  editPost,
  getArticleDetail,
  clearDetail,
} from "../../redux/actions/actions";
import Nav from "../../components/Nav/Nav";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
//import Divider from "@material-ui/core/Divider";
import { ThemeProvider } from "@material-ui/core/styles";
import "./Post.css";
import style from "./Post.module.css";
//MODAL
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

const useStyles = makeStyles({
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
    maxWidth: "80%",
  },
});

function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const articlesDetail = useSelector((state) => state.rootReducer.articlesDetail);
  const user_id = useSelector((state) => state.rootReducer.user_id);
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();

  const [body, setBody] = useState("");
  const [titulo, setTitulo] = useState("");
  const [subcategoria, setSubcategoria] = useState("");

  //MOdal
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = React.useState('1');

  const handleOpen = () => {
    setOpen(true);
	setOn('0')
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
  };

  const handleInputCat = (e) => {
    let index = e.target.selectedIndex;
    let option = e.target.options[index].value;
    // setCategoria(option.split("-")[0]);
    setSubcategoria(option.split("-")[1]);
  };

  // const handleSubmitPrevia = (e) => {
  //   e.preventDefault();
  //   console.log("Esto es body-prev:", body);
  // };

  const handleSubmitBody = async (e) => {
    e.preventDefault();

    let data = {
      art_contents: body,
      art_title: titulo,
      sub_cat_id: subcategoria,
      user_id: user.sub,
      art_date: date,
      art_id: id ? articlesDetail.art_id : null,
    };

    // action createPost or editPost
    const token = await getAccessTokenSilently();
    if (id) {
      dispatch(editPost(data, token));
      setBody("");
      setTitulo("");
      history.push("/post_exitoso");
    } else {
      dispatch(createPost(data, token));
      setBody("");
      setTitulo("");
      history.push("/post_exitoso/Creado");      
      //handleOpen()
	  //window.location.reload();
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getArticleDetail(id));
    }
    return () => dispatch(clearDetail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (articlesDetail && user_id) {
      setBody(articlesDetail.art_contents);
      setTitulo(articlesDetail.art_title);
      if (articlesDetail.user_id !== user_id) {
        history.push("/");
      }
    }
  }, [articlesDetail, history, user_id]);

  return (
    <div>
      <Nav />
      <ThemeProvider theme={theme}>
        <header className={`${style.contenedor_editor} ${style.centrado}`}>
          <Typography variant="h2" color="initial">
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
            />
            <FormControl>
              <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                onChange={handleInputCat}
              >
                <option aria-label="None" value="" />
                <optgroup label="Investigación">
                  <option value={"Investigación-1"}>
                    Metodologia de investigación
                  </option>
                  <option value={"Investigación-2"}>Elección de tema</option>
                </optgroup>
                <optgroup label="Normas Apa">
                  <option value={"Normas Apa-3"}>Citado en el texto</option>
                  <option value={"Normas Apa-4"}>
                    Referencias bibliográficas
                  </option>
                </optgroup>
              </Select>
            </FormControl>
          </div>
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
                  <div className={classes.paper}>{
					  on === '0' ? (<>
					  <Typography>{titulo}</Typography>
                    <br />
                    <Typography variant="body2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${body}`,
                        }}
                      />
                    </Typography>
					</>) : (
						<Typography>Post creado con éxito</Typography>
					)
				  }
                    
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
          </div>
        </header>
      </ThemeProvider>
    </div>
  );
}

Post.modules = {
  toolbar: [
    [{ header: "1" }, { header: ["2", "3", "4", "5", "6"] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }],
  ],
};

Post.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
];

export default Post;
