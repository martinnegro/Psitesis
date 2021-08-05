import { LoginButton } from '..';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

const Login = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<div>
			{isAuthenticated ? (
				<Redirect to="/home" />
			) : (
				<div>
					<h1>pagina de Home sin logear</h1>
					<LoginButton btnText="Comencemos" loginWith="Redirect" />
				</div>
			)}
			<div></div>
		</div>
	);
};

export default Login;
