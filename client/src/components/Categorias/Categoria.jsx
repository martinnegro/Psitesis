import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'; 
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticle, getAllCategories } from '../../redux/actions/actions';
import Card2 from '../Card/Card2';
import PopularPost from '../PopularPost/PopularPost';
// import s from "./Home.module.css";

const useStyles = makeStyles((theme) => ({
    category: {
        backgroundColor: 'purple',
        display: 'flex',
        marginTop: '20px',
        marginBottom: '20px',
    },
    category1:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    popularPost:{
        display:  'flex',
        alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white'
    },
    post:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    
}))

export default function Category (props) {

const {categoria, id} = props

const classes = useStyles();
const articles = useSelector((state) => state.rootReducer.articles); // Nueva forma de acceder al estado por combineReducer
const subCategorias = useSelector(state => state.rootReducer.categories.sub_cats)

const dispatch = useDispatch();

//Me tengo que traer las subcategorias
//cada sub categorias tiene sus articulos y a que categoria pertence 

// const articlesCategory = articles.filter(a => a.sub_cat_id === )


const [pageNumber, setPageNumber] = useState(0);
const postsByPage = 9;
const pagesVisited = pageNumber * postsByPage;
const pageCount = Math.ceil(articles?.length / postsByPage);
const changePage = ({ selected }) => {
    setPageNumber(selected);
};

useEffect(() => {
    dispatch(getAllArticle());
    dispatch(getAllCategories())
  }, [dispatch]);

    return (
        <Container>
            <Typography variant='h4'>{categoria}</Typography>
            <Container className={classes.category}>
                <Card2 
                title ={articles[0]?.art_title}
                abstract={articles[0]?.art_abstract}
                date={articles[0]?.art_date}
                body={articles[0]?.art_contents}
                id={articles[0]?.art_id}
                key={articles[0]?.art_id} />
                <Container className={classes.category1}>
                    <Card2 
                    title ={articles[1]?.art_title}
                    abstract={articles[1]?.art_abstract}
                    date={articles[1]?.art_date}
                    body={articles[1]?.art_contents}
                    id={articles[1]?.art_id}
                    key={articles[1]?.art_id} />
                    <Card2 
                    title ={articles[2]?.art_title}
                    abstract={articles[2]?.art_abstract}
                    date={articles[2]?.art_date}
                    body={articles[2]?.art_contents}
                    id={articles[2]?.art_id}
                    key={articles[2]?.art_id} />
                </Container>  
                <Container className={classes.popularPost}>
                    <Typography>Popular Post</Typography>
                    <Container className={classes.post}>
                        <Typography>01</Typography>
                        <PopularPost
                        title={articles[0]?.art_title}/>
                    </Container >    
                    <Container className={classes.post}>
                        <Typography>02</Typography>
                        <PopularPost
                        title={articles[0]?.art_title}/>
                    </Container>    
                    <Container className={classes.post}>
                        <Typography>03</Typography>
                        <PopularPost
                        title={articles[0]?.art_title}/>
                    </Container>    
                </Container>  
                {/* <Container>
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
                </Container>   */}
            </Container>
        </Container>
    )
}