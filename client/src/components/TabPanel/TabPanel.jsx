import React, { useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Search from '../Busqueda/Busqueda';
import { getSubCategory } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card2 from '../Card/CardTabPanel';
import { Divider, Typography } from '@material-ui/core';


export default function TabPanel(props) {

    const { children, value, index, id, ...other } = props;
    const dispatch = useDispatch();
    const Subcategory = useSelector(state => state.rootReducer.subCategory[id]);

    useEffect(() => {
        dispatch(getSubCategory(id))
    }, [dispatch, id]);

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other} >
            <Container style={{display: 'flex', alignItems :'center', justifyContent: 'center', marginTop:'20px'}}>
                <Search/>
            </Container>
            {
                value === index ? (
                    Subcategory?.length > 0 ? (
                        Subcategory.map(s => (
                        <Container key={s.sub_cat_id}>
                            <Typography 
                            variant='h4' 
                            style={{marginBottom:'15px', marginTop:'15px'}}>
                                {s.sub_cat_name}
                            </Typography>
                            <Container 
                            style={{
                                display:'flex', 
                                justifyContent:'space-between',
                                flexWrap: 'wrap'}}>
                                    {
                                        s.articles.length > 0 ? (s.articles.map(a => (
                                            <Card2
                                            title ={a.art_title}
                                            abstract={a.art_abstract}
                                            date={a.art_date}
                                            body={a.art_contents}
                                            id={a.art_id}
                                            userId={a.user_id}/>
                                        ))) : null
                                    }
                            </Container>
                            <Divider variant="middle" />
                        </Container>
                    ))) : null
                ) : null
            }
      </div>
    );
  }