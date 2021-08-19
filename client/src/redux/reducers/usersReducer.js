import {
	GET_ALL_USERS,
	IS_FETCHING_USERS,
	SET_USER_DETAIL,
	GET_USERS_BY_ROLES,
	GET_USERS_ADMIN,
    GET_USERS_COLABORATOR
} from '../actions/usersActions';

const initialState = {
	userDetail: null,
	users: [],
	isFetching: false,
	usersByRoles: [],
	admins: null,
    colaborators: null,
};

export default function usersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case IS_FETCHING_USERS:
			return {
				...state,
				isFetching: true,
			};
		case GET_ALL_USERS:
			return {
				...state,
				users: payload,
				isFetching: false,
			};
		case SET_USER_DETAIL:
			return {
				...state,
				userDetail: payload,
			};
		case GET_USERS_BY_ROLES:
			return {
				...state,
				usersByRoles: payload,
			};
		case GET_USERS_ADMIN:
			return {
				...state,
				admins: payload,
			};
		case GET_USERS_COLABORATOR:
			return {
				...state,
				colaborators: payload,
			};
		default:
			return state;
	}
}
