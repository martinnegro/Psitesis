import axios from 'axios';
const URL_API = 'http://localhost:3001';

export const GET_INSTITUTIONS    = 'GET_INSTITUTIONS';
export const IS_FETCHING         = 'IS_FETCHING';
export const UPDATE_INSTITUTION  = 'UPDATE_INSTITUTION';
export const GET_ONE_INSTITUTION = 'GET_ONE_INSTITUTION';
export const DELETE_INSTITUTION  = 'DELETE_INSTITUTION';

export function isFetching() {
    return {
        type: IS_FETCHING
    }
}

export function getInstitutions() {
    return function (dispatch) {
        dispatch(isFetching())
        return axios.get(`${URL_API}/institutions`)
                .then((response) => {
                    dispatch({ type: GET_INSTITUTIONS, payload: response.data });
                })   
    }
}

export function getOneInstitution(inst_id) {
    return function (dispatch) {
        return axios.get(`${URL_API}/institutions/${inst_id}`)
                    .then((response) => dispatch({type: GET_INSTITUTIONS, payload: response.data}))
    };
}

export function updateInstitution(inst_id,body) {
    return function(dispatch) {
        return axios.put(`${URL_API}/institutions/${inst_id}`,body);
    }
}

export function deleteInstitution(inst_id) {
    return function(dispatch) {
        return axios.delete(`${URL_API}/institutions/${inst_id}`);
    }
}

