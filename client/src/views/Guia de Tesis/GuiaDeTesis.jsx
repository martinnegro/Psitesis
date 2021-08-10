import React, { useEffect } from 'react';
import Nav from "../../components/Nav/Nav";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from "@material-ui/core";
import Category from '../../components/Categorias/Categoria';
import Search from '../../components/Busqueda/Busqueda';
import { getAllCategories } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    title:{
        marginTop: '20px',
        backgroundColor: 'purple',
        width: '100%',
        textAlign: 'center',
        color: 'white'
    }    
}))

export default function GuiaDeTesis() {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.rootReducer.categories)

    console.log('categories :', categories)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

const classes = useStyles();

    return (
        <Container>
            <div className={classes.offset}></div>
            <Nav/>
            <Container>
                <Container>
                    <Container className={classes.title}>
                        <Typography variant='h2' >Guia de Tesis</Typography>
                    </Container>
                    <Container style={{display: 'flex', alignItems :'center', justifyContent: 'center', marginTop:'20px'}}>
                        <Search/>
                    </Container>
                    {
                        categories.cats?.length > 0 ?
                        categories.cats.map(c => (
                            <Category key={c.cat_id} id={c.cat_id} categoria= {c.cat_name}/>
                        )): null
                    }
                </Container>
            </Container>
        </Container>
    )
}