import {
	GET_ALL_ARTICLE,
	GET_ARTICLE_DETAIL,
	GET_USERS,
	SET_USER_ID,
	SET_USER_ROLES,
} from '../actions/actions';

const initialState = {
	articles: [],
	articlesDetail: undefined,
	users: [],
	user_id: undefined,
	user_roles: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ARTICLE:
			return {
				...state,
				articles: action.payload,
			};
		case GET_ARTICLE_DETAIL:
			return {
				...state,
				articlesDetail: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case SET_USER_ID:
			return {
				...state,
				user_id: action.payload,
			};
		case SET_USER_ROLES:
			return {
				...state,
				user_roles: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;
