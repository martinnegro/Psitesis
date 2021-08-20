import React, { useEffect, useState } from 'react';
import Nav from "../../components/Nav/Nav";
import Container from "@material-ui/core/Container";
import { alpha, makeStyles, Typography, Divider, Button } from "@material-ui/core";
import { getAllCatSub,  } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel/TabPanel'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card2 from '../../components/Card/CardTabPanel';
import { getArticleTag, getArticleWhithoutSection } from '../../redux/actions/actionsArticles';
import ReactPaginate from "react-paginate";
import s from "../Home/Home.module.css";

  
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
    title:{
        marginTop: '20px',
        backgroundColor: 'purple',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
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
    title2: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      // marginLeft: '164px',
    },
  }));

export default function GuiaDeTesis() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [search, setSearch] = React.useState('');
    const [generales, setGenerales ] = useState(false)

    const categories = useSelector((state) => state.rootReducer.cat_sub?.cats);
    const orderedArticles = useSelector((state) => state.articlesReducer.orderedArticles)
    const ArticleWithoutSection = useSelector(state => state.articlesReducer.ArticleWithoutSection);

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
      dispatch(getArticleWhithoutSection())
    }, [dispatch]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onChange = (e) => {
      setSearch(e.target.value)
      if(search) dispatch(getArticleTag(search))
    }
    
    const onClick = () => {
      setGenerales(!generales)
    }

    return (
        <Container>
            <div className={classes.offset}></div>
              <Nav/>
              <Container className={classes.title}>
                <Button onClick={onClick} style={{color: 'white'}}>Generales</Button>
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
          {
              !generales ? (
                <div className={classes.root}>
                  <AppBar position="static" color="default" >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      className={classes.tabs}
                    >
                    {
                        categories?.length > 0 ?
                        categories.map(c => (
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
                                <Card2
                                key={a.art_id}
                                title ={a.art_title}
                                abstract={a.art_abstract}
                                date={a.art_date}
                                body={a.art_contents}
                                id={a.art_id}
                                userId={a.user_id}/>
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
                      categories?.length > 0 ?
                      categories.map((c, i) => (
                          <TabPanel value={value} id={c.cat_id} index={i} sinSeccion={false}/>
                      )): null
                  }
                </div>
            ) : (
              <div className={classes.root}>
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
                                <Card2
                                key={a.art_id}
                                title ={a.art_title}
                                abstract={a.art_abstract}
                                date={a.art_date}
                                body={a.art_contents}
                                id={a.art_id}
                                userId={a.user_id}/>
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

                <Container style={{display:'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {

                    ArticleWithoutSection?.length > 0 ? ArticleWithoutSection.map(a => (
                     <Card2
                         key={a.art_id}
                         title ={a.art_title}
                         abstract={a.art_abstract}
                         date={a.art_date}
                         body={a.art_contents}
                         id={a.art_id}
                         userId={a.user_id}/>)) : null
                  }
                </Container>
                </div>
            )
          }
    </Container> 
  )
};