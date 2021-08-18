import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import VerifyEmail from '../VerifyEmail';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
	const { user, isAuthenticated } = useSelector(
		(state) => state.authReducer
	);
	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAuthenticated ? (
					user.email_verified ? (
						<Component {...props} />
					) : (
						<VerifyEmail {...props} />
					)
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
