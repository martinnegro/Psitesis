import {
    IS_FETCHING,
    GET_INSTITUTIONS,
    GET_ONE_INSTITUTION,
} from '../actions/actionsInstitutions';

const initialState = {
    isFetching: true,
    institutions: []
}

export default function institutionsReducer (state = initialState, { type, payload }) {
    switch (type) {
        case IS_FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case GET_INSTITUTIONS:
            return {
                institutions: payload, 
                isFetching: false
            };
        case GET_ONE_INSTITUTION:
            const aux = state.institutions.slice();
            return {
                ...state,
                institutions: aux.map(i => i.inst_id === payload.inst_id ? payload : i)
            }
        default:
            return state;
    }
}