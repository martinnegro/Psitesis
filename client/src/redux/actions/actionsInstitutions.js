import axios from 'axios';
const { REACT_APP_URL_API } = process.env;

export const GET_INSTITUTIONS    = 'GET_INSTITUTIONS';
export const IS_FETCHING         = 'IS_FETCHING';
export const CREAT_NEW_INSITUTION = 'CREAT_NEW_INSITUTION';
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
        return axios.get(`${REACT_APP_URL_API}/institutions`)
                .then((response) => {
                    dispatch({ type: GET_INSTITUTIONS, payload: response.data });
                })   
    }
}

export function getOneInstitution(inst_id) {
    return function (dispatch) {
        return axios.get(`${REACT_APP_URL_API}/institutions/${inst_id}`)
                    .then((response) => dispatch({type: GET_INSTITUTIONS, payload: response.data}))
    };
}

export function createNewInstitution(inst) {
    return function (dispatch){
        return axios.post(`${REACT_APP_URL_API}/institutions/`,inst)
                    .then((response) => dispatch({type: CREAT_NEW_INSITUTION, payload: response.data}))
    }
}


export function updateInstitution(inst_id,body) {
    return function(dispatch) {
        return axios.put(`${REACT_APP_URL_API}/institutions/${inst_id}`,body);
    }
}

export function deleteInstitution(inst_id) {
    return function(dispatch) {
        return axios.delete(`${REACT_APP_URL_API}/institutions/${inst_id}`)
                    .then(() => dispatch({type: DELETE_INSTITUTION, payload: inst_id }));
    }
}

