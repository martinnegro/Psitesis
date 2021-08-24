import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../Loading';
import {
	checkAuth,
	setLoading,
	loginWithAccessToken,
} from './../../redux/actions/actionsAuth';

import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

export const getParameterByName = (name) => {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const AuthProvider = ({ children }) => {
	const { isLoading, isAuthenticated } = useSelector(
		(state) => state.authReducer
	);
	const { LastNotification } = useSelector(
		(state) => state.notificationsReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (LastNotification) {
			toast(LastNotification.description);
		}
	}, [LastNotification]);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(checkAuth());
		} else {
			const accessToken = getParameterByName('access_token');
			if (!accessToken) {
				dispatch(setLoading(false));
				return;
			}
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
	return (
		<>
			{children}
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
		</>
	);
};

export default AuthProvider;
