import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../Loading';
import {
	checkAuth,
	loginWithAccessToken,
} from './../../redux/actions/actionsAuth';

export const getParameterByName = (name) => {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const AuthProvider = ({ children }) => {
	const { isLoading, isAuthenticated } = useSelector(
		(state) => state.authReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(checkAuth());
		} else {
			const accessToken = getParameterByName('access_token');
			if (!accessToken) return;
			dispatch(loginWithAccessToken(accessToken));
		}
	}, [dispatch, isAuthenticated]);

	if (isLoading) {
		return (
			<div className="App">
				<Loading />
			</div>
		);
	}
	return <>{children}</>;
};

export default AuthProvider;
