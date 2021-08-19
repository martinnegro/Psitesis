import axios from 'axios';
import * as API from '../API';

const { REACT_APP_URL_API } = process.env;

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const IS_FETCHING_USERS = 'IS_FETCHING_USERS';
export const GET_USERS_BY_ROLES = 'GET_USERS_BY_ROLES';
export const SET_USER_DETAIL = 'GET_USERS_BY_ROLES';

export const getAllUsers = () => {
	return async (dispatch) => {
		try {
			dispatch(isFetchingUsers());
			const response = await API.getAllUsers();
			dispatch({ type: GET_ALL_USERS, payload: response.data });
		} catch (error) {
			console.log(error);
		}
	};
};

export function isFetchingUsers() {
	return {
		type: IS_FETCHING_USERS,
	};
}

export const getUserDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.getUserDetail(id);
			if (response?.data?.message === 'successful') {
				dispatch(setUserDetail(response.data.user));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const setUserDetail = (payload) => {
	return { type: SET_USER_DETAIL, payload: payload };
};

export const clearUserDetail = () => {
	return { type: SET_USER_DETAIL, payload: null };
};

export const getUsersByRoles = (rol) => {
	return async (dispatch) => {
		try {
			const response = await API.getUsersByRoles(rol);
			dispatch({ type: GET_USERS_BY_ROLES, payload: response.data });
		} catch (error) {
			console.log(error);
		}
	};
};

