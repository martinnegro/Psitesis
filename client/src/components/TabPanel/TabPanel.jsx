import React, { useEffect } from 'react';
import { getSubCategory } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Subcategoria  from "./subcategory";

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
            {
                value === index ? (
                    Subcategory?.length > 0 ? (
                        Subcategory.map(s => (
                        <Subcategoria articles={s.articles} id={s.sub_cat_id} name={s.sub_cat_name} sinSeccion={false} />
                    ))) : null
                ) : null
            }
      </div>
    );
  }
