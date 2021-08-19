import axios from 'axios';
import * as API from '../API';

const { REACT_APP_URL_API } = process.env;

export const GET_ALL_CATEGORIES = 'GET ALL CATEGORIES';
export const GET_ALL_CAT_SUB = 'GET_ALL_CAT_SUB';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_SUB_CATEGORY = 'GET_SUB_CATEGORY';

//////////////////////////////////////
export const GET_ADMINS = 'GET_ADMINS';

export const setCategory = (body) => {
	return async (dispatch) => {
		try {
			const data = {
				id: body.id,
				name: body.name,
			};
			const response = await API.setCategory(data);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const setSubCategory = (body) => {
	return async (dispatch) => {
		try {
			const data = {
				id: body.id,
				name: body.name,
				description: body.description,
			};
			const response = await API.setSubCategory(data);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteCategory = (id) => {
	return async (dispatch) => {
		try {
			console.log('eliminar');
			const response = await API.deleteCategory(id);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const deleteSubCategory = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.deleteSubCategory(id);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const createNewCategory = (newCategory) => {
	return async (dispatch) => {
		try {
			const response = await API.createNewCategory(newCategory);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const createNewSubCategory = (newSubCategory) => {
	return async (dispatch) => {
		try {
			const response = await API.createNewSubCategory(newSubCategory);
			if (response.data) {
				dispatch({
					type: GET_ALL_CAT_SUB,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const createPost = (newPost, token) => async (dispatch) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		await axios.post(`${REACT_APP_URL_API}/article`, newPost, { headers });
	} catch (err) {
		console.log(err);
		return;
	}
};

export const editPost = (editPost, token) => async (dispatch) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		await axios.put(
			`${REACT_APP_URL_API}/article/${editPost.art_id}`,
			editPost,
			{
				headers,
			}
		);
	} catch (err) {
		console.log(err);
		return;
	}
};

export const deletePost = (art_id, token) => async (dispatch) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		await axios.delete(`${REACT_APP_URL_API}/article/${art_id}`, {
			headers,
		});
	} catch (err) {
		console.log(err);
		return;
	}
};

export const getAllCatSub = () => {
	return async (dispatch) => {
		try {
			const response = await axios(`${REACT_APP_URL_API}/categories`);
			dispatch({
				type: GET_ALL_CAT_SUB,
				payload: response.data,
			});
		} catch (error) {
			console.error(error);
		}
	};
};

export const getCategory = (id) => {
	return async (dispatch) => {
		try {
			const response = await axios(`${REACT_APP_URL_API}/categories/${id}`);
			dispatch({
				type: GET_CATEGORY,
				payload: {
					data: response.data,
					id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
};

export const getSubCategory = (id) => {
	return async (dispatch) => {
		try {
			const response = await axios(
				`${REACT_APP_URL_API}/subcategory/category/${id}`
			);
			console.log('response: ', response.data);
			dispatch({
				type: GET_SUB_CATEGORY,
				payload: {
					data: response.data,
					id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
};
