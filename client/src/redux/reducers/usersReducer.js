import { 
    GET_ALL_USERS, 
    IS_FETCHING_USERS,
    SET_USER_DETAIL,
    GET_USERS_BY_ROLES,
} from "../actions/usersActions";

const initialState = {
    userDetail: null,
    users: [],
    isFetching: false,
    usersByRoles: [],
}

export default function usersReducer(state = initialState, { type, payload }) {
    switch(type) {
        case IS_FETCHING_USERS:
            return {
                ...state,
                isFetching: true
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload,
                isFetching: false
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
        default:
            return state;
    }
}