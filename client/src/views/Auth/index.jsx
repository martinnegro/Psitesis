import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { login } from '../../redux/auth';

export const getParameterByName = (name) => {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const Auth = () => {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.authReducer);

	useEffect(() => {
		if (!isAuthenticated) {
			dispatch(login());
		}
	}, [dispatch, isAuthenticated]);

	if (isAuthenticated) {
		return <Redirect to="/home" />;
	}

	return <Loading />;
};

export default Auth;