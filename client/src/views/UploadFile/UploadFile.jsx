import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Uploader from "../../components/uploader/Uploader";
import { getAllFiles, searchFiles } from "../../redux/actions/fileActions";
import { useDispatch, useSelector } from "react-redux";
import CardLibrary from "../../components/Card/CardLibrary";
import NavBottom from "../../components/NavBottom/NavBottom";
import {
  IconButton,
  InputBase,
  makeStyles,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import s from './UploadFile.module.css';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  Home: {
    // marginLeft: theme.spacing(15),
    margin: theme.spacing(5),
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 601px)": {
      margin: theme.spacing(0),
      margin: 0,
      padding: 0,
    },
  },
  divCards: {
    margin: 0,
    padding: 0,
    whidth: "80%",
  },
  contCard: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
    "@media (max-width: 601px)": {
      flexDirection: "column",
    },
  },
  tipoh2: {
    textTransform: "uppercase",
    "@media (max-width: 601px)": {
      marginTop: 0,
      fontSize: "1.75rem",
      marginBottom: "10px",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  estiloTypBtn: {
    textAlign: 'center', 
    alignItems: 'center', 
    fontSize: 10
  }
}));

const Library = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.filesReducer.files);
  const classes = useStyles();
  const { user } = useSelector((state) => state.authReducer);
  const [busqueda, setBusqueda] = useState('');
  const [reload, setReload] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [mostrar, setMostrar] = useState(false);

  const postsByPage = 9;
  const pagesVisited = pageNumber * postsByPage;
  const pageCount = Math.ceil(files?.length / postsByPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
          if(!isSearching){
          dispatch(getAllFiles())
          setReload(false) 
          }
          setIsSearching(false)
  }, [dispatch, reload]);

  const onChange = (e) => {
    setBusqueda(e.target.value)
}

  const handleSubmit = (e) => {
    e.preventDefault()
      dispatch(searchFiles(busqueda))
      setIsSearching(true)
      setReload(true)
  }

  const onClickMostrar = () => {
    setMostrar(!mostrar)
  }

 

  return (
    <Container>
      <div className={classes.offset}></div>
      <Nav />
      <Container className={classes.Home}>
        <Typography variant="h2" align="center" className={classes.tipoh2}>
          Biblioteca
        </Typography>

        {
        user?.roles?.includes("admin") ||
        user?.roles?.includes("superadmin") ? (
          <> 
          {
            !mostrar ? (<span>
              <Button
              onClick={onClickMostrar}              
              >
               <Typography variant="p" color="initial" className={classes.estiloTypBtn}>Subir Archivo</Typography>  
              </Button>
            </span>) : (<span>
            <Button
            onClick={onClickMostrar}
            >
              <Typography variant="p" color="initial" className={classes.estiloTypBtn}>Ocultar Formulario</Typography>
            </Button>
          </span>)
          }
                   
          {mostrar ? (
            <Uploader />
          ) : (null)}            
          </>
        ) : null}
        <br />
        <Paper
          component="form"
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <InputBase
            className={classes.input}
            placeholder="Buscar..."
            value={busqueda}
            onChange={onChange}
            name="search"
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>


        {files.length > 0 ? (
          <Container>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={s.paginationBttns}
            previousLinkClassName={s.previousBttn}
            nextLinkClassName={s.nextBttn}
            disabledClassName={s.paginationDisabled}
            activeClassName={s.paginationActive}
          />
        </Container>
        ) : (null) }
        

        <Container className={classes.contCard}>
          {files.length > 0 ? (
            files?.slice(pagesVisited, pagesVisited + postsByPage).map((e) => (
              <CardLibrary
                key={e.id}
                id={e.id}
                name={e.name}
                desc={e.description}
                url={e.url}
              />
            ))
          ) : (
            <div style={{ margin: "0 auto" }}>
              <Typography variant="body2">No hay datos ...</Typography>
            </div>
          )}
        </Container>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </Container>
  );
};

export default Library;
