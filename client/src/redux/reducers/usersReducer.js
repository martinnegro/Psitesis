import { 
    GET_ALL_USERS, 
    IS_FETCHING_USERS,
    SET_USER_ID,
    SET_USER_ROLES,
    GET_USERS_BY_ROLES,
} from "../actions/usersActions";

const initialState = {
    users: [],
    isFetching: false,
    user_id: undefined,
    user_roles: [],
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
        case SET_USER_ID:
            return {
                ...state,
                user_id: payload,
            };
        case SET_USER_ROLES:
            return {
                ...state,
                user_roles: payload,
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