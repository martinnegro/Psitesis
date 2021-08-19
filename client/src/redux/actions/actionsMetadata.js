import * as API from '../API';

export const SET_METADATA = 'SET_METADATA';

export const getUserMetadata = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.getUserMetadata(id);
			if (
				response?.data?.message === 'successful' &&
				response?.data?.metadata !== null
			) {
				dispatch(setMetadata(response.data.metadata));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const createNewLinkInMetadata = (newLink, user_id_A0) => {
	return async (dispatch) => {
		try {
			const data = {
				user_id_A0,
				newLink,
			};
			const response = await API.createNewLinkInMetadata(data);
			if (
				response?.data?.message === 'successful' &&
				response?.data?.metadata !== null
			) {
				dispatch(setMetadata(response.data.metadata));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const deleteLinkInMetadata = (link, user_id_A0) => {
	return async (dispatch) => {
		try {
			const data = {
				params: {
					user_id_A0,
					link,
				},
			};
			const response = await API.deleteLinkInMetadata(data);
			if (
				response?.data?.message === 'successful' &&
				response?.data?.metadata !== null
			) {
				dispatch(setMetadata(response.data.metadata));
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
