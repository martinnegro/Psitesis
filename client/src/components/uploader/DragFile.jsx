import React, { useState, useRef, useEffect } from "react";
import { makeStyles, TextField, createTheme} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import './dragImage.css';
import { ThemeProvider } from '@material-ui/core/styles';

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


const useStyles = makeStyles((theme) => ({
  tipoh2: {
    textTransform: "uppercase",
    "@media (max-width: 601px)": {
      marginTop: 0,
      fontSize: "1.75rem",
      marginBottom: "10px",
    },
  },
  root: {
	'color': '#ffffff',
	'backgroundColor': '#031927',
  border: 'none',
  borderRadius: '3px',
  height: '32px',
  fontWeight: '400',
	'&:hover': {
		backgroundColor: '#031927',
    cursor: 'default'
	},
},
root2: {
	textTransform: 'uppercase',
},
formInput: {
  display: "flex", 
  flexDirection: "row",
  "@media (max-width: 601px)": {
    flexDirection: "column",
  },
},
sinBorde: {
  marginTop: 20, 
  maxWidth: "70%",  
}
}));

const DragFile = ({ setDesc, setMedia, setLoading }) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [contador, setContador] = useState(0);

  const [image, setImage] = useState(null);

  const refInputFile = useRef(null);

  const typesImages = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/msword']

  const isImageValid = (file) => {
    if (file && typesImages.includes(file.type)) {
      setError(false);
      return true;
    } else {
      setError(true);
      setMessageError("Formato incorrecto");
      return false;
    }
  };



  const handleChangeDesc = (e) => {
    e.preventDefault();
    setContador(e.target.value.length);
    setDesc(e.target.value);
  };

  const handleSave = () => {
    const valid = isImageValid(file);

    if (valid && file) {
      setLoading(true);
    } else {
      setError(true);
      setMessageError("Primero, elija un archivo");
    }
  };

  const showImage = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });

    setFile(file);
    setMedia(file);
  };

  const uploadImage = (e) => {
    const files = e.target.files;
    const file = files[0];

    const valid = isImageValid(file);

    if (valid) {
      showImage(file);
    } else {
      setFile(null);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>

      <div className={classes.formInput}>
        <form>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-full-width"
            label="DESCRPCION"
            className={classes.sinBorde}
            placeholder="Escribe aquí..."
            helperText={`Disponible ${120 - contador} caracteres | Solo se admiten PDF o DOC`}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="desc"
            type="text"
            onChange={handleChangeDesc}
            inputProps={{
              maxLength: 120,
            }}
            required
            rows={3}
            multiline
          />
          </ThemeProvider>
        </form>
        <div style={{ display: "flex", flexDirection: "column", marginTop: '20px' }}>
          {error && <div className="drag__message">{messageError}</div>}
          <div class="file-select" id="src-file1" >
            <input
		  	    className={classes.root2}
            ref={refInputFile}
            type="file"
            name="file"
            onChange={uploadImage}			
          /> 
          </div>
           
		  <br />        
          <Button onClick={handleSave} className={classes.root}>Guardar Archivo</Button>
        </div>
      </div>
    </div>
  );
};

export default DragFile;
