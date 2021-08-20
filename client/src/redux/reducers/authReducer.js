import {
	SET_ACCESS_TOKEN,
	SET_USER,
	SET_AUTHENTICATE,
	SET_LOADING,
	SET_ERROR,
} from '../actions/actionsAuth';
const user = JSON.parse(localStorage.getItem('user'));
const access_token = localStorage.getItem('access_token');
console.log("token: ",access_token )
const userEmpy = {
	user_id: '',
	picture: '',
	roles: [],
};
const initialState = {
	user: user ? user : null,
	access_token: access_token ? access_token : null,
	isAuthenticated: user && access_token ? true : false,
	isLoading: false,
	errors: null
};

export default function usersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_USER:
			return {
				...state,
				user: payload,
			};
		case SET_ACCESS_TOKEN:
			return {
				...state,
				access_token: payload,
			};
		case SET_AUTHENTICATE:
			return {
				...state,
				isAuthenticated: payload,
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case SET_ERROR:
			return {
				...state,
				errors: payload,
			};
		default:
			return state;
	}
}
