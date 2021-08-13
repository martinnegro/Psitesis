import axios from 'axios';
const { REACT_APP_URL_API } = process.env;

export const SET_METADATA = 'SET_METADATA';
export const CLEAR_METADATA = 'CLEAR_METADATA';


export const getUserMetadata = (id, token) => {
	return async (dispatch) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const params = {
				id: id,
			};
			const response = await axios.get(`${REACT_APP_URL_API}/metadata`, {
				params,
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

export const clearUserMetadata = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: CLEAR_METADATA,
				payload: undefined,
			});
		} catch (error) {
			console.error(error);
		}
	};
};
