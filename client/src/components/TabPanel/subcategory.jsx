import { Container, Divider, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'; 
import ReactPaginate from 'react-paginate';
import style from "../../views/Home/Home.module.css";
import Card2 from '../Card/CardTabPanel';

export default function Subcategoria (props) {

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
            style={{marginBottom:'15px', marginTop:'15px'}}>
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
                    )) : <Typography 
                    variant='h5' 
                    style={{marginBottom:'15px', marginTop:'15px'}}>
                    No existen artículos para esta sección.
                    </Typography>
                }
            </Container>
            {
                articles.length > 0 ? (
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
                ) : null
            }
            <Divider variant="middle" />
        </Container>
    
    )
}