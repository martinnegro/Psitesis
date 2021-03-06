import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';


const Selectores = () => {
	const cat_sub = useSelector((state) => state.rootReducer.cat_sub);

	var gat = cat_sub.cats;
	var sgat = cat_sub.sub_cats;

	var selectores = gat?.map((el) => ({
		name: el.cat_name,
		id: el.cat_id,
		subcategories: sgat.filter((obj) => obj.cat_id === el.cat_id),
}));

	return (
		<Fragment>
			{selectores?.map((e) => (
				<optgroup key={e.id} label={e.name}>
					{e.subcategories?.map((s) => (
						<option key={s.sub_cat_id}  value={`${s.sub_cat_id}`}>
							{s.sub_cat_name}
						</option>
					))}
				</optgroup>
			))}
		</Fragment>
	);
};

export default Selectores;
