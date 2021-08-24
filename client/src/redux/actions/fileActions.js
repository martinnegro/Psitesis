import * as API from '../API';
import { fbStorage } from '../../services/firebase'

export const GET_ALL_FILES = 'GET_ALL_FILES';
export const ADD_FILE = 'ADD_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';



export const createFile = (file) => {
	return async (dispatch) => {
		try {
			const response = await API.createFile(file);
			if (response.data) {
				dispatch({
					type: ADD_FILE,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const getAllFiles = () => {
	return async (dispatch) => {
		try {
			const response = await API.getAllFiles();
			if (response.data) {
				dispatch({
					type: GET_ALL_FILES,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};


export const deleteFile = (file_id, url) => {
	return async (dispatch) => {
		try {
			let fileRef = fbStorage.refFromURL(url);
			await fileRef.delete()
			await API.deleteFile(file_id);
				dispatch({
					type: REMOVE_FILE,
					payload: file_id,
				});
		} catch (err) {
			console.log(err);
			return;
		}
	};
};

export const searchFiles = (name) => {
	return async (dispatch) => {
		try {
			const response = await API.searchFiles(name);
			if (response.data) {
				dispatch({
					type: GET_ALL_FILES,
					payload: response.data,
				});
			}
		} catch (err) {
			console.log(err);
			return;
		}
	};
};
