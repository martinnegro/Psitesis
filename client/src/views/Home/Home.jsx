import React, { useEffect, useState } from "react";
// import { NavLink } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import Nav from "../../components/Nav/Nav";
import CardPost from "../../components/Card/Card";
import s from "./Home.module.css";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider, IconButton, InputBase,  makeStyles,
   Paper, TextField,  Typography,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { getAllArticle, getArticleTag } from "../../redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  Home: {
    // marginLeft: theme.spacing(15),
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 700,
    marginTop: "20px",
    marginBottom: "30px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Home() {
  const classes = useStyles();
  const articles = useSelector((state) => state.rootReducer.articles); // Nueva forma de acceder al estado por combineReducer
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllArticle());
  }, [dispatch]);

  // const [ search, setSearch ] = useState('')
  const [pageNumber, setPageNumber] = useState(0);
  const [tag, setTag] = useState('')

  const postsByPage = 9;
  const pagesVisited = pageNumber * postsByPage;
  const pageCount = Math.ceil(articles?.length / postsByPage);

  const onChange = (e) => {
      if (e.target.name === 'search') setTag(e.target.value)
  }

  const handleSubmit = (e) => {
    if(tag){
      e.preventDefault()
      dispatch(getArticleTag(tag))
    }
    else{
      alert("Ingrese un TAG")
    }
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Container>
      <div className={classes.offset}></div>
      <Nav />
      <Container className={classes.Home}>
        <Container align="center">
          <Typography
            variant="h2"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            Bienvenidos
          </Typography>
          <Typography>
            En Psitesis encontrarás {/* <NavLink to='#'> */}
            <span style={{ color: "purple" }}>ARTICULOS</span>
            {/* </NavLink> */} escritos por {/* <NavLink to='#'> */}
            <span style={{ color: "purple" }}>COLABORADORES</span>
            {/* </NavLink> */} expertos en la contrucción de tesis.
          </Typography>
          <Typography>
            Si seguís con dudas podés escribir en el {/* <NavLink to='#'> */}
            <span style={{ color: "purple" }}>FORO</span>
            {/* </NavLink> */}, donde encontrarás otros colegas que puedan
            ayudarte.
          </Typography>
        </Container>

        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                    <InputBase
                      className={classes.input}
                      placeholder="Escribí aquí el artículo que deseas encontrar"
                      value={tag}
                      onChange={(e)=>setTag(e.target.value)}
                      name='search'
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                </Paper>

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

        <Container
          style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
        >
          {articles?.length > 0
            ? articles
                ?.slice(pagesVisited, pagesVisited + postsByPage)
                .map((p) => (
                  <CardPost
                    key={p.art_id}
                    title={p.art_title}
                    body={p.art_contents}
                    id={p.user_id}
                    articleId={p.art_id}
                    articleAbstract={p.art_abstract}
                  />
                ))
            : null}
        </Container>
      </Container>
      {/* <Container>
                <Container>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='#'>Foro</NavLink>
                    <NavLink to='#'>Guía de Tesis</NavLink>
                    <NavLink to='#'>Colaboradores</NavLink>
                </Container>
            </Container> */}
    </Container>
  );
}
