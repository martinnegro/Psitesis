import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ btnText, loginWith }) => {
	const { loginWithPopup, loginWithRedirect } = useAuth0();

	function login() {
		switch (loginWith) {
			case 'Popup':
				loginWithPopup();
				break;
			case 'Redirect':
				loginWithRedirect();
				break;
			default:
				loginWithPopup();
				break;
		}
	}

	return <button onClick={() => login()}>{btnText}</button>;
};

export default LoginButton;
