import { Avatar, Container, Divider, Typography } from '@material-ui/core';
import React from 'react'; 
import ReactPaginate from 'react-paginate';
import style from './paginate.module.css';
import Card2 from '../Card/CardTabPanel';
import blog from '../../assets/blog.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: 'flex',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    // },
    // small: {
    //   width: theme.spacing(3),
    //   height: theme.spacing(3),
    // },
    large: {
      display:'flex',
      width: theme.spacing(15),
      height: theme.spacing(15),
      justifyContent: 'center',
      marginTop: '50px'
     
    },
    container:{
        display:'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    },
    titulo:{
        marginBottom:'15px',
        marginTop:'15px',
        "@media (max-width: 601px)":{
            fontSize: "1.75rem",
            marginBottom:'0px',
        }
    }
  }));

export default function Subcategoria (props) {

    const classes = useStyles();

    const { articles,  id , name } = props;
    
    const [pageNumber, setPageNumber] = React.useState(0);
    const postsByPage = 2;
    const pagesVisited = pageNumber * postsByPage;
    const pageCount = articles ? Math.ceil(articles?.length / postsByPage) : '';
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
        <Container key={id}>
            <Typography 
            variant='h4' 
            className={classes.titulo}>
                {name}
            </Typography>
        <Container 
            style={{
            display:'flex', 
            justifyContent:'space-between',
            flexWrap: 'wrap'}}>
                {
                    articles.length > 0 
                    ? articles 
                    ?.slice(pagesVisited, pagesVisited + postsByPage)
                    ?.map(a => (
                        <Card2
                        key={a.art_id}
                        title ={a.art_title}
                        abstract={a.art_abstract}
                        date={a.art_date}
                        body={a.art_contents}
                        id={a.art_id}
                        userId={a.user_id}/>
                    )) : (
                    <Container className={classes.container}>
                        <Avatar  variant="rounded" src={blog} className={classes.large}  /> 
                        <Typography 
                        variant='h5' 
                        style={{
                            // marginBottom:'15px', 
                            marginTop:'15px',
                            marginBottom: '50px',
                            textAlign: 'center'}}>
                        No existen artículos para esta sección.
                        </Typography>
                    </Container>
                    )
                }
            </Container>
            {
                articles.length > 0 ? (
                    <>
                    <Container>
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={style.paginationBttns}
                      previousLinkClassName={style.previousBttn}
                      nextLinkClassName={style.nextBttn}
                      disabledClassName={style.paginationDisabled}
                      activeClassName={style.paginationActive}
                    />
                    </Container>
    
                    <Divider /* variant="middle" */ style={{width:'100%', marginTop:'10px', marginBottom:'10px'}} />
                    </>
                ) : null
            }
        </Container>
    
    )
}