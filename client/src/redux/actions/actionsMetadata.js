import axios from 'axios';
import * as API from '../API';
const { REACT_APP_URL_API } = process.env;

export const SET_METADATA = 'SET_METADATA';

export const getUserMetadata = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.getUserMetadata(id);
			if (
				response?.data?.message === 'successful' &&
				response?.data?.metadata !== null
			) {
				dispatch(setMetadata);
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const setMetadata = (metadata) => {
	return { type: SET_METADATA, payload: metadata };
};

export const clearUserMetadata = () => {
	return { type: SET_METADATA, payload: null };
};

export const createNewLinkInMetadata = (newLink, user_id_A0, token) => {
	return async (dispatch) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const data = {
				user_id_A0,
				newLink,
			};
			const response = await axios.post(`${REACT_APP_URL_API}/metadata`, data, {
				headers,
			});
			if (response.status === 200) {
				if (response.data.metadata && response.data.metadata !== null) {
					dispatch({
						type: SET_METADATA,
						payload: response.data,
					});
				}
			} else {
				console.log('No se encontrar el user');
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const deleteLinkInMetadata = (link, user_id_A0, token) => {
	return async (dispatch) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const data = {
				user_id_A0,
				link,
			};
			const response = await axios.delete(`${REACT_APP_URL_API}/metadata`, {
				headers,
				data,
			});
			if (response.status === 200) {
				if (response.data.metadata && response.data.metadata !== null) {
					dispatch({
						type: SET_METADATA,
						payload: response.data,
					});
				}
			} else {
				console.log('No se encontrar el user');
			}
		} catch (error) {
			console.error(error);
		}
	};
};
