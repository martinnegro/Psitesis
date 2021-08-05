import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Nav from '../../components/Nav/Nav';
import "./Post.css";
import style from "./Post.module.css";
import ReactQuill from "react-quill";
import '../../../node_modules/react-quill/dist/quill.snow.css'
// import CreateIcon from "@material-ui/icons/Create";

//Miguel -->
import { Typography, Button } from "@material-ui/core";
//import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
//>-- Lo basico aqui



import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from '@material-ui/core/styles';
//import purple from '@material-ui/core/colors/purple';



const useStyles = makeStyles({
    root: {
      background: 'purple',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  });

function Post() {

    const classes = useStyles();
    const { user } = useAuth0();


  const [body, setBody] = useState("");
  const [titulo, setTitulo] = useState("");
  const[categoria, setCategoria] = useState('')
  const[subcategoria, setSubcategoria] = useState('')

  const handleBody = (e) => {
    setBody(e);
  };

  const handleInput = (e) => {
    setTitulo(e.target.value);
  };

  const handleInputCat = (e) => {    
    let index = e.target.selectedIndex;
    let option = (e.target.options[index].value);
    setCategoria(option.split('-')[0]);
    setSubcategoria(option.split('-')[1]);
  };

  // const handleSubmitPrevia = (e) => {
  //   e.preventDefault();
  //   console.log("Esto es body-prev:", body);
  // };

  const handleSubmitBody = async (e) => {
    e.preventDefault();
    let data = {
      description: body,
      title: titulo,
      categoria: categoria,
      subcategoria: subcategoria,
      userName: user.name,
    };
    //Crear funcion Validate
    //let aux = validate(Data);
    //Aqui Post
    // if (aux === true) {
      try {
        await axios.post("http://localhost:3001/article", data);
      } catch (err) {
        console.log(err);
        return;
      }
    console.log("Esto es objectPost:", data);
    setBody("");
    setTitulo("");
    setCategoria("");
  };


  

  return (
    <div>
      <Nav />
      <header className={`${style.contenedor_editor} ${style.centrado}`}>
        <Typography variant="h2" color="initial">
          NUEVO POST
        </Typography>
        <hr />
        <div className={style.botones}>
          <TextField 
          id="standard-basic" 
          label="Titulo" 
          name='titulo'
          type='text'
          value={titulo}
          onChange={handleInput}
          />
          <FormControl>
            <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
            <Select 
            native defaultValue="" 
            id="grouped-native-select"
            onChange={handleInputCat}
            >
              <option aria-label="None" value='' />
              <optgroup label="Category 1" >
                <option value={'Categoria1-Option1'}>Option 1</option>
                <option value={'Categoria1-Option2'}>Option 2</option>
              </optgroup>
              <optgroup label="Category 2">
                <option value={'Categoria2-Option3'}>Option 3</option>
                <option value={'Categoria2-Option4'}>Option 4</option>
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
        <hr />
        <br />
        <div className={style.botones}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => {
              alert("pulsado");
            }}
            classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
          >
            VISTA PREVIA
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleSubmitBody}
            classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
          >
            POSTEAR
          </Button>
        </div>
      </header>
    </div>
  );
}

Post.modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { header: ["3", "4", "5", "6"] },
      { font: [] },
    ],
    [{ size: [] }],
    ["bold", "italic", "underline",  "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
    ],
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
