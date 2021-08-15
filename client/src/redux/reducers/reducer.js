import {
  GET_USERS,
  SET_USER_ID,
  SET_USER_ROLES,
  ORDER_ARTICLES,
  GET_ARTICLE_TAG,
  GET_ALL_CAT_SUB,
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  GET_USERS_BY_ROLES,
} from "../actions/actions";

const initialState = {
  users: [],
  user_id: undefined,
  user_roles: [],
  
  cat_sub: {},
  category: {},
  subCategory:{},
  usersByRoles: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
    
    
    case GET_ALL_CAT_SUB:
      return {
        ...state,
        cat_sub: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category:{
          ...state.category,
          [action.payload.id] : action.payload.data,
        }
      };
    case GET_SUB_CATEGORY:
      return {
        ...state,
        subCategory:{
          ...state.subCategory,
          [action.payload.id]: action.payload.data
        } 
      }
    case GET_USERS_BY_ROLES:
      return {
        ...state,
        usersByRoles: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
