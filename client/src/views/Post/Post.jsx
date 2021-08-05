import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/actions';
import axios from "axios";
import Nav from "../../components/Nav/Nav";

import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import { ThemeProvider } from "@material-ui/styles";
import "./Post.css";
import style from "./Post.module.css";

const useStyles = makeStyles({
  root: {
    color: "#ffffff",
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
});

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: purple,
  },
});

function Post() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();

  const [body, setBody] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");

  
  const hoy = new Date(Date.now());
  const date = (hoy.toLocaleDateString());


  const handleBody = (e) => {
    setBody(e);
  };

  const handleInput = (e) => {
    setTitulo(e.target.value);
  };

  const handleInputCat = (e) => {
    let index = e.target.selectedIndex;
    let option = e.target.options[index].value;
    setCategoria(option.split("-")[0]);
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
    };

    // action createPost
    const token = await getAccessTokenSilently();
    dispatch(createPost(data, token));
    /*try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post("http://localhost:3001/article", data, { headers });
    } catch (err) {
      console.log(err);
      return;
    }*/
    console.log("Esto es objectPost:", data);
    setBody("");
    setTitulo("");
    setCategoria("");
  };

  return (
    <div>
      <Nav />
      <ThemeProvider theme={theme}>
        <header className={`${style.contenedor_editor} ${style.centrado}`}>
          <Typography variant="h2" color="initial">
            NUEVO POST ARTICULO
          </Typography>
          <Divider
            style={{ background: "purple", width: "70%", marginLeft: "15%" }}
          />
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
                <optgroup label="General">
                  <option value={"General-1"}>Noticias</option>
                  <option value={"General-2"}>Dudas generales</option>
                </optgroup>
                <optgroup label="Investigación">
                  <option value={"Investigación-3"}>Elección de tema</option>
                </optgroup>
                <optgroup label="Normas APA">
                  <option value={"Normas APA-4"}>Citado en el texto</option>
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
          <Divider
            style={{ background: "purple", width: "70%", marginLeft: "15%" }}
          />
          <br />
          <div className={style.botones}>
            {/* <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => {
              alert("pulsado");
            }}
            classes={{
              root: classes.root, 
              label: classes.label, 
            }}
          >
            VISTA PREVIA
          </Button> */}
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
              POSTEAR
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
];

export default Post;
