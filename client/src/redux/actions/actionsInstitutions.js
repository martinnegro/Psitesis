import axios from 'axios';
const URL_API = 'http://localhost:3001';

export const GET_INSTITUTIONS = 'GET_INSTITUTIONS';
export const IS_FETCHING      = 'IS_FETCHING';

export function isFetching() {
    return {
        type: IS_FETCHING
    }
}

export function getInstitutions() {
    return function (dispatch) {
        dispatch()
        axios.get(`${URL_API}/institutions`)

    }
}


