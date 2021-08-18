import axios from 'axios';
const { REACT_APP_URL_API } = process.env;
const API = axios.create({ baseURL: REACT_APP_URL_API });

//con este intercertor pueden enviar sus peticiones directamente con el token en los headers
API.interceptors.request.use((req) => {
	if (localStorage.getItem('access_token')) {
		const token = localStorage.getItem('access_token');
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

//peticiones ruta auth
export const checkAuth = () => API.get(`/auth/check_token`);
export const sendVerificationEmail = () => API.get(`/auth/send_verify_email`);
export const getArticles = () => API.get(`/auth/send_verify_email`);

