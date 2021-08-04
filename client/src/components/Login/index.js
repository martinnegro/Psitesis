import { LoginButton } from '..';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const URL_API = 'http://localhost:3001';

const Login = () => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	async function callApiPublicRoute() {
		try {
			const response = await axios.get(`${URL_API}/public`);
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function callApiPrivateRoute() {
		try {
			const token = await getAccessTokenSilently();
			const response = await axios.get(`${URL_API}/private`, {
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function callApiPrivateScopedRoute() {
		try {
			const token = await getAccessTokenSilently();
			const response = await axios.get(`${URL_API}/private-scoped`, {
				headers: { authorization: `Bearer ${token}` },
			});
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div>
			{isAuthenticated ? (
				<Redirect to="/home" />
			) : (
				<div>
					<h1>pagina de Home sin logear</h1>
					<LoginButton btnText="Comencemos" loginWith="Popup" />
				</div>
			)}
			<div>
				<button onClick={callApiPublicRoute}>Call API public route</button>

				<button onClick={callApiPrivateRoute}>Call API private route</button>

				<button onClick={callApiPrivateScopedRoute}>
					Call API private-scoped route
				</button>
			</div>
		</div>
	);
};

export default Login;
