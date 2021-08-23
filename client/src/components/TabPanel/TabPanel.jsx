import React, { useEffect, useState } from 'react';
import { getSubCategory } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Subcategoria  from "./subcategory";
import { getArticleWhithoutSection } from '../../redux/actions/actionsArticles';

export default function TabPanel(props) {
   
    const { children, value, index, id, sinSeccion, ...other } = props;

    const dispatch = useDispatch();

    const subcategory = useSelector(state => state.rootReducer.subCategory);
    const ArticleWithoutSection = useSelector(state => state.articlesReducer.ArticleWithoutSection);
    
    const [ sub, setSub ] = useState({})
    
    useEffect(() => {
        dispatch(getArticleWhithoutSection())
      }, [dispatch]);

    useEffect(() => {
        dispatch(getSubCategory(id))
    }, [dispatch, id]);
    
    useEffect(() => {
        dispatch(getArticleWhithoutSection())
      }, [dispatch]);

    useEffect(() => {
        if(!subcategory['Generales']){
            setSub({ Generales:[{ 
            sub_cat_id: "Generales",
            sub_cat_name: "Generales",
            sub_cat_description: null,
            cat_id: "Generales",
            articles: [...ArticleWithoutSection]
          }], ...subcategory})
        }
      }, [ArticleWithoutSection, subcategory])

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other} >
            {
                value === index ? (
                    !sinSeccion ? (
                        sub[id]?.length > 0 ? (
                            sub[id].map(s => (
                            <Subcategoria articles={s.articles} id={s.sub_cat_id} name={s.sub_cat_name} />
                        ))) : null
                    ): null
                ) : null
            }
      </div>
    );
  }
