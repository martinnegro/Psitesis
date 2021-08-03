import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = ({ btnText }) => {
	const { logout } = useAuth0();
	return (
		<button
			onClick={() =>
				logout({
					returnTo: window.location.origin,
				})
			}
		>
			{btnText}
		</button>
	);
};

export default LogoutButton;
