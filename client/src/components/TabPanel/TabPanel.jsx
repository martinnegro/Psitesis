import React, { useEffect } from 'react';
import { getSubCategory } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Subcategoria  from "./subcategory";
import { getArticleWhithoutSection } from '../../redux/actions/actionsArticles';
import Card2 from '../Card/CardTabPanel';


export default function TabPanel(props) {
   
    const { children, value, index, id, sinSeccion, ArticleWithoutSection, ...other } = props;
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
            {
                value === index ? (
                    !sinSeccion ? (
                        Subcategory?.length > 0 ? (
                            Subcategory.map(s => (
                            <Subcategoria articles={s.articles} id={s.sub_cat_id} name={s.sub_cat_name} />
                        ))) : null
                    ) : ArticleWithoutSection?.length > 0 ? ArticleWithoutSection.map(a => (
                    <Card2
                        key={a.art_id}
                        title ={a.art_title}
                        abstract={a.art_abstract}
                        date={a.art_date}
                        body={a.art_contents}
                        id={a.art_id}
                        userId={a.user_id}/>
                )) : null
                ) : null
            }
      </div>
    );
  }
