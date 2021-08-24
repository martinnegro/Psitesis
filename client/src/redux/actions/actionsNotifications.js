import openSocketIO from 'socket.io-client';
import * as API from '../API';
const { REACT_APP_URL_API } = process.env;
export const SET_SOCKET_IO = 'SET_SOCKET_IO';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_LAST_NOTIFICATION = 'SET_LAST_NOTIFICATION';
export const SET_READ_NOTIFICATION = 'SET_READ_NOTIFICATION';

export const ConnectServerIO = (ID) => {
	return async (dispatch) => {
		try {
			const newSocket = openSocketIO(REACT_APP_URL_API, { query: { ID: ID } });
			setSocketIO(newSocket);
			newSocket.on('NOTIFICATIONS', (data) => {
                console.log("recivido", data);
				dispatch(addNotification(data));
				dispatch(lastNotification(data));
			});
            dispatch(getNotifications());            
		} catch (error) {
			console.log(error);
		}
	};
};

export const sentNotificationTest = () => {
	return async (dispatch) => {
		try {
			await API.sentNotificationTest();
		} catch (error) {
			console.log(error);
		}
	};
};

export const getNotifications = () => {
	return async (dispatch) => {
		try {
			const response = await API.getNotifications();
			if (response.data?.message === 'successful') {
				dispatch(setNotifications(response.data.notifications));
                console.log(response.data.notifications);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const setReadNotifications = () => {
	return {
		type: SET_READ_NOTIFICATION,
		payload: false,
	};
};

export const setSocketIO = (socket) => {
	return {
		type: SET_SOCKET_IO,
		payload: socket,
	};
};

export const lastNotification = (notification) => {
	return {
		type: SET_LAST_NOTIFICATION,
		payload: notification,
	};
};

export const setNotifications = (notifications) => {
	return {
		type: SET_NOTIFICATIONS,
		payload: notifications,
	};
};

export const addNotification = (notification) => {
	return {
		type: ADD_NOTIFICATION,
		payload: notification,
	};
};
