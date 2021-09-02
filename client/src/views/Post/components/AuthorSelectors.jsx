import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllCollabs } from '../../../redux/API';

const AuthorSelectors = ({}) => {
	const [ collabs, setCollabs ] = useState();

	useEffect(async ()=>{
		const newCollabs = await getAllCollabs();
		setCollabs(newCollabs.data)
	},[]);

	return (
		<>
			{
				collabs ?
				collabs.map(c => (
					<option key={c.user_id}  value={c.user_id}>
						{`${c.user_name}`}
					</option>
				))
				: null
			}
		</>
	);
};

export default AuthorSelectors;