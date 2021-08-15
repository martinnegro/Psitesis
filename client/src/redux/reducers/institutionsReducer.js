import {
    IS_FETCHING,
    GET_INSTITUTIONS,
    GET_ONE_INSTITUTION,
    CREAT_NEW_INSITUTION,
    DELETE_INSTITUTION,
    GET_INSTITUTION_BIO
} from '../actions/actionsInstitutions';

const initialState = {
    isFetching: true,
    institutions: [],
    institutionBio: [],
}

export default function institutionsReducer (state = initialState, { type, payload }) {
    const aux = state.institutions.slice();
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
        case CREAT_NEW_INSITUTION:
            aux.push(payload);
            return {
                ...state,
                institutions: aux
            }
        case GET_ONE_INSTITUTION:
            return {
                ...state,
                institutions: aux.map(i => i.inst_id === payload.inst_id ? payload : i)
            }
        case DELETE_INSTITUTION:
            return {
                ...state,
                institutions: aux.filter(i => i.inst_id !== payload)
            }
        case GET_INSTITUTION_BIO:
            return {
                ...state,
                institutionBio: payload,
            };
        default:
            return state;
    }
}