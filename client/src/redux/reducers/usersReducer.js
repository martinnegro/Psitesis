import { GET_ALL_USERS, IS_FETCHING_USERS } from "../actions/usersActions";

const initialState = {
    users: [],
    isFetching: false
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
                users: payload,
                isFetching: false
            }
        default:
            return state;
    }
}