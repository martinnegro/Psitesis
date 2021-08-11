import axios from 'axios';
const { REACT_APP_URL_API } = process.env

export const GET_ALL_USERS     = 'GET_ALL_USERS';
export const IS_FETCHING_USERS = 'IS_FETCHING_USERS';

export function getAllUsers() {
    return function (dispatch) {
        dispatch(isFetchingUsers())
        return axios.get(`${REACT_APP_URL_API}/users`)
                    .then(response => dispatch({ type: GET_ALL_USERS, payload: response.data }))
    }; 
};

export function isFetchingUsers() {
    return {
        type: IS_FETCHING_USERS
    }
}