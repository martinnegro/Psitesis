import React, {Fragment} from 'react';

const Optiones = ({subcategorias}) => {
    
    return ( 
        <Fragment>
            {subcategorias?.map( s => {
                {console.log('entre a options', s.sub_cat_id, s.sub_cat_name)}
                <option key={s.sub_cat_id} value={s.sub_cat_id}>
                    {s.sub_cat_name}
                </option>
                })}
        </Fragment>
     );
}
 
export default Optiones;

