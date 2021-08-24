import {
	SET_SOCKET_IO,
	ADD_NOTIFICATION,
	SET_NOTIFICATIONS,
	SET_LAST_NOTIFICATION,
	SET_READ_NOTIFICATION,
} from '../actions/actionsNotifications';

const initialState = {
	socket: null,
	notifications: [],
	LastNotification: null,
};

const notificationsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_SOCKET_IO:
			return {
				...state,
				socket: payload,
			};
		case ADD_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, payload],
			};
		case SET_NOTIFICATIONS:
			return {
				...state,
				notifications: payload,
			};
		case SET_LAST_NOTIFICATION:
			return {
				...state,
				LastNotification: payload,
			};
		case SET_READ_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.map((noty) =>
					noty.read === false ? { ...noty, read: true } : noty
				),
			};
		default:
			return state;
	}
};

export default notificationsReducer;
