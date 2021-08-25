import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import Nav from "../../components/Nav/Nav";
import CardPost from "../../components/Card/CardHome";
import s from "./Home.module.css";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import {
  getAllArticle,
  orderArticles,
  getArticleTag,
} from "../../redux/actions/actionsArticles";
import { getUserDetail } from "../../redux/actions/usersActions";
import { Link } from "react-router-dom";

//Menu Bottom
import NavBottom from "../../components/NavBottom/NavBottom";

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
    width: "70%",
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
  estiloH5: {
    flexGrow: 1, 
    textTransform: 'uppercase',
    "@media (max-width: 601px)": {     
      fontSize: "1.20rem",
      marginBottom: 20,      
    },
  },
  estiloMasLeidos: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center',
    "@media (max-width: 601px)": {
      flexDirection: 'column',
    },
  }
}));

export default function Home() {
  const history = useHistory();
  const classes = useStyles();
  const articles = useSelector((state) => state.articlesReducer.articles); // Nueva forma de acceder al estado por combineReducer
  const orderedArticles = useSelector(
    (state) => state.articlesReducer.orderedArticles
  );
  const userId = useSelector((state) => state.authReducer.user.user_id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllArticle());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderArticles("art_views", "DESC"));
  }, [dispatch, articles]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetail(userId));
    }
  }, [dispatch, userId]);

  // const [ search, setSearch ] = useState('')
  const [pageNumber, setPageNumber] = useState(0);
  const [tag, setTag] = useState("");

  const postsByPage = 9;
  const pagesVisited = pageNumber * postsByPage;
  const pageCount = Math.ceil(articles?.length / postsByPage);

  const onChange = (e) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    if (tag) {
      dispatch(getArticleTag(tag));
    }

    if (tag === "") {
      dispatch(orderArticles("art_views", "DESC"));
    }
  }, [tag, dispatch]);

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
            //style={{ marginBottom: "20px" }}
            className={classes.tipoh2}
          >
            Bienvenidos
          </Typography>
          <Typography>
            En Psitesis encontrarás <span style={{ color: "purple" }}>ARTICULOS</span> escritos por <span style={{ color: "purple" }}>COLABORADORES</span> expertos en la contrucción de tesis.
          </Typography>
          <Typography>
            Si seguís con dudas podés escribir en el <span style={{ color: "purple" }}>FORO</span>, donde encontrarás otros colegas que puedan
            ayudarte.
          </Typography>
          <br />
          <Typography>
            También podes visitar nuestra sección con archivos para descargar haciendo <Link to='/library'>click aquí</Link>
          </Typography>
        </Container>

        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Escribí aquí el artículo que deseas encontrar"
            value={tag}
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
        {tag !== ""?
          <Typography variant="h4">Resultado de su busqueda para <span style={{ color: "purple" }}>{tag}</span></Typography>
          :
          null
        }
        <Container className={classes.estiloMasLeidos}>
          <Typography variant="h5" color="initial" className={classes.estiloH5}>
            Artículos más leídos.
          </Typography>
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

        <Container className={classes.contCard}>
          {orderedArticles?.length > 0 ? (
            orderedArticles
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
          ) : (
            <div>
              <div className={s.centrado}>
                <Typography variant="h5" color="initial">
                  No hay resultados para su búsqueda
                </Typography>
              </div>
            </div>
          )}
        </Container>
        <br />
        <br />
        <br />
        <br />
        <NavBottom />
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
