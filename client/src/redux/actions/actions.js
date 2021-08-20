import * as API from '../API';

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

export const createPost = (newPost) => {
	return async (dispatch) => {
		try {
			await API.createPost(newPost);
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const editPost = (editPost) => {
	return async (dispatch) => {
		try {
			await API.editPost(editPost);
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const deletePost = (art_id) => {
	return async (dispatch) => {
		try {
			await API.deletePost(art_id);
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const getAllCatSub = () => {
	return async (dispatch) => {
		try {
			const response = await API.getAllCatSub();
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

export const getCategory = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.getCategory(id);
			if (response.data) {
				dispatch({
					type: GET_CATEGORY,
					payload: {
						data: response.data,
						id,
					},
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const getSubCategory = (id) => {
	return async (dispatch) => {
		try {
			const response = await API.getSubCategory(id);
			if (response.data) {
				dispatch({
					type: GET_SUB_CATEGORY,
					payload: {
						data: response.data,
						id,
					},
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const createPostForum = (newPost) => {
	return async (dispatch) => {
		try {
			await API.createPostForum(newPost);
		} catch (err) {
			console.log(err);
			return;
		}
	};
};


