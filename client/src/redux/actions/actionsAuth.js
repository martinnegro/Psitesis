import auth0 from 'auth0-js';
import axios from 'axios';
import * as API from '../API';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USER = 'SET_ACCESS_TOKEN';
export const SET_AUTHENTICATE = 'SET_AUTHENTICATE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

const {
	REACT_APP_AUTH0_DOMAIN,
	REACT_APP_AUTH0_CLIENT_ID,
	REACT_APP_AUTH0_AUDIENCE,
	REACT_APP_URL_API,
	REACT_APP_HOST,
	//REACT_APP_AUTH0_TENANT,
} = process.env;

const databaseConnection = 'Username-Password-Authentication';
const configAuth0 = {
	/*overrides: {
		__tenant: REACT_APP_AUTH0_TENANT,
		__token_issuer: `https://${REACT_APP_AUTH0_DOMAIN}`,
	},*/
	domain: REACT_APP_AUTH0_DOMAIN,
	clientID: REACT_APP_AUTH0_CLIENT_ID,
	redirectUri: `${REACT_APP_HOST}`,
	responseType: 'token',
	audience: REACT_APP_AUTH0_AUDIENCE,
	scope: 'openid profile email',
	protocol: 'oauth2',
	response_type: 'token',
	response_mode: 'query',
	code_challenge_method: 'S256',
};

const ReactAuth0 = new auth0.WebAuth(configAuth0);

export const LoginWithEmailPassword = (email, password) => {
	return async (dispatch) => {
		try {
			ReactAuth0.redirect.loginWithCredentials(
				{
					connection: 'Username-Password-Authentication',
					email: email,
					password: password,
					scope: 'openid profile email',
				},
				(err) => {
					if (err) dispatch(setError(err));
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
};

export const RegisterWithEmailPassword = (email, username, password) => {
	return async (dispatch) => {
		try {
			ReactAuth0.redirect.signupAndLogin(
				{
					connection: databaseConnection,
					username: username,
					email: email,
					password: password,
				},
				(err) => {
					if (err) dispatch(setError(err));
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
};

export const loginWithGoogle = () => {
	return async (dispatch) => {
		ReactAuth0.authorize(
			{
				connection: 'google-oauth2',
				redirectUri: `${REACT_APP_HOST}`,
			},
			(error) => {
				console.log(error);
			}
		);
	};
};

export const loginWithFacebook = () => {
	return async (dispatch) => {
		ReactAuth0.authorize(
			{
				connection: 'facebook',
				redirectUri: `${REACT_APP_HOST}`,
			},
			(error) => {
				console.log(error);
			}
		);
	};
};
export const loginWithAccessToken = (accessToken) => {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await axios.get(
				`${REACT_APP_URL_API}/auth/check_token`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (response.data?.message === 'verified token') {
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				dispatch(setUser(response.data.user));
				dispatch(setAccessToken(accessToken));
				dispatch(setAuthenticate(true));
			} else {
				dispatch(logOut());
			}
			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
			dispatch(logOut());
			dispatch(setLoading(false));
		}
	};
};


export const checkAuth = () => {
	return async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const response = await API.checkAuth();
			if (response.data?.message === 'verified token') {
				console.log(response.data);
				dispatch(setUser(response.data.user));
				dispatch(setAuthenticate(true));
			} else {
				dispatch(logOut());
			}
			dispatch(setLoading(false));
		} catch (error) {
			console.log(error);
			dispatch(logOut());
			dispatch(setLoading(false));
		}
	};
};

export const sendVerificationEmail = () => {
	return async (dispatch) => {
		try {
			await API.sendVerificationEmail();
		} catch (error) {
			console.log(error);
		}
	};
};

export const logOut = () => {
	console.log("test");
	return (dispatch) => {
		dispatch(setUser(null));
		dispatch(setAccessToken(null));
		dispatch(setAuthenticate(false));
	};
};

export const setError = (error) => {
	return {
		type: SET_ERROR,
		payload: error,
	};
};

export const setLoading = (bolean) => {
	return {
		type: SET_LOADING,
		payload: bolean,
	};
};

export const setAuthenticate = (bolean) => {
	return {
		type: SET_AUTHENTICATE,
		payload: bolean,
	};
};

export const setAccessToken = (accessToken) => {
	if (!accessToken) {
		localStorage.removeItem('access_token');
	}
	return {
		type: SET_ACCESS_TOKEN,
		payload: accessToken,
	};
};

export const setUser = (user) => {
	if (!user) {
		localStorage.removeItem('user');
	}
	return {
		type: SET_USER,
		payload: user,
	};
};
