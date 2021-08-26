import React, { useEffect, useState } from 'react';
import Nav from "../../components/Nav/Nav";
import Container from "@material-ui/core/Container";
import { alpha, makeStyles, Typography, Divider, Button, Fab, Zoom, Fade, Paper, Box } from "@material-ui/core";
import { getAllCatSub,  } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
// import Tabs, { tabsClasses } from '@material-ui/core/Tabs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel/TabPanel'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card2 from '../../components/Card/CardTabPanel';
import { getArticleTag } from '../../redux/actions/actionsArticles';
import ReactPaginate from "react-paginate";
import s from "./GuiaDeTesis.module.css";
import NavBottom from '../../components/NavBottom/NavBottom';
// import SearchIcon from '@material-ui/icons/Search';
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      justifyContent: 'center'
    },
    offset: theme.mixins.toolbar,
    blog:{
      "@media (max-width: 601px)":{
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // display: "block",
        overflowX: "auto",
        width: '100%',
        padding: 0,
        "& .MuiTabs-flexContainer":{
          paddingLeft: 100,
        }
      }
    },
    title:{
        marginTop: '20px',
        backgroundColor: 'purple',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        "@media (max-width: 601px)":{
          display: 'none'
        }
    },
    tabs:{
      backgroundColor: "#031927",
      "& .MuiTabs-flexContainer":{
        justifyContent:'space-around'
      }, 
      '&:focus': {
        color: 'white',
      }, 
      "& .MuiTabs-indicator":{
        backgroundColor: 'white'
      }
    },
    tabsText:{
      color: "#93827F",
      '&:focus': {
        color: 'white',
      },
      
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '80%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '50%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      // transition: theme.transitions.create('width'),
      width: '80%',
      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch',
      //   },
      // },
    },
    inputRoot2: {
      color: 'inherit',

    },
    inputInput2: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      // transition: theme.transitions.create('width'),
      width: '80%',
      heigth: '100%',

      // backgroundColor: 'purple'
      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch',
      //   },
      // },
    },
    title2: {
      flexGrow: 1,
      marginLeft: '200px',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    fab:{
      display: 'none',
      "@media (max-width: 601px)":{
      display: 'flex',
      margin: 0,
      top: 'auto',
      right: '-10px',
      bottom: 59,
      left: 'auto',
      position: 'fixed',
      paddingBottom: '6px',
      paddingTop: '5px',
      justifyContent: 'flex-end',
      }
    },
    root2: {
      height: 180,
    },
    container2: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1),
      width: '270px'
    }
  }));

export default function GuiaDeTesis() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const [value, setValue] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [Categoriess, setCategoriess ] = useState([])

    const categories = useSelector((state) => state.rootReducer.cat_sub?.cats);
    const orderedArticles = useSelector((state) => state.articlesReducer.orderedArticles)

    const [pageNumber, setPageNumber] = React.useState(0);
    const postsByPage = 2;
    const pagesVisited = pageNumber * postsByPage;
    const pageCount = Math.ceil(orderedArticles?.length / postsByPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    useEffect(() => {
    dispatch(getAllCatSub())
    }, [dispatch]);

    useEffect(() => {
      if(categories){
      const aux = categories.find(obj => obj.cat_name === 'Generales')
      if (!aux){
      setCategoriess([{
          cat_id: "Generales",
          cat_name:"Generales"
        }, ...categories])
    }}
    }, [categories])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onChange = (e) => {
      setSearch(e.target.value)
      if(search) dispatch(getArticleTag(search))
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange2 = () => {
      setChecked(!checked);
    };

    useEffect(() => {
      if(checked === true){
        window.scrollTo(0, 0)
      }
      if(checked === false){
        setSearch('')
      }
    },[checked])
    
    return (
        <Container className={classes.blog}>
            <div className={classes.offset}></div>
              <Nav/>
                <Container className={classes.title}>
                    <Typography variant='h2' className={classes.title2} noWrap>Guía de Tesis</Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                      placeholder="Search…"
                      value={search}
                      onChange={onChange}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}/>
                    </div>
                </Container>
                <div className={classes.root}>
                  <AppBar position="static" color="default" >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      // indicatorColor="primary"
                      // textColor="primary"
                      variant="scrollable"
                      scrollButtons
                      // allowScrollButtonsMobile
                      // scrollButtons={true}
                      aria-label="visible arrows tabs example"
                      className={classes.tabs}
                    >
                    {
                        Categoriess?.length > 0 ?
                        Categoriess.map(c => (
                          <Tab label={c.cat_name} key={c.cat_id} id={c.cat_id} {...a11yProps(c.cat_id)} className={classes.tabsText} />
                        ))  : null
                    }
                    
                    </Tabs>
                  </AppBar>
                  {
                    search ? (
                      <Container>
                        <Typography 
                          variant='h4' 
                          style={{marginBottom:'15px', marginTop:'15px'}}>
                        Resultados del blog para <span style={{color:'purple'}}>{search}</span>:
                        </Typography>
                        <Container 
                        style={{
                          display:'flex', 
                          justifyContent:'center',
                          flexWrap: 'wrap'}}>
                            {
                              orderedArticles?.length > 0 
                              ? orderedArticles
                              ?.slice(pagesVisited, pagesVisited + postsByPage)
                              .map(a => (
                                <Container style={{marginLeft:'-10px'}}>
                                    <Card2
                                    title ={a.art_title}
                                    abstract={a.art_abstract}
                                    date={a.art_date}
                                    body={a.art_contents}
                                    id={a.art_id}
                                    userId={a.user_id}/>
                                  </Container>
                              )) : <Typography variant="h6" color="initial">No hay resultados para su búsqueda</Typography>
                            }
                        </Container>
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
                        <Divider variant="middle" />
                      </Container>
                    ) : null
                  }
                  {
                      Categoriess?.length > 0 ?
                      Categoriess.map((c, i) => (
                          <TabPanel value={value} id={c.cat_id} index={i}/>
                      )): null
                  }
     
                    <Container className={classes.fab} style={checked ? { backgroundColor: 'white',} : null}>
                             <div className={classes.container2}>
                                <Fade in={checked}>
                                  <Paper elevation={4} className={classes.paper}>
                                    <InputBase placeholder="Search…" value={search} onChange={onChange} 
                                      classes={{
                                        root: classes.inputRoot2,
                                        input: classes.inputInput2,
                                        }}
                                      inputProps={{ 'aria-label': 'search' }}/>
                                  </Paper>
                                </Fade>
                              </div>
                        <Fab style={{backgroundColor: '#031927', color:'white'}} aria-label="add">
                        <SearchIcon onClick={handleChange2}/>
                        </Fab>
                  </Container>
                </div>  
                <br />
                <br />
                <br />
                <br />
                <NavBottom />
            </Container>
  )
};

/*
1) tego que fijarme si el array tiene la categoria 'Sin seccion'
  - con un includes o hasOwnProperty o some 
2) si no la tiene, la creo y le creo la sub categoria
  - Lo puedo hacer con useEffect
  - Lo puede hacer desde el reducer
3) tengo que traer los articulos sin seccion y ponerle la seccion creada
  -

*/