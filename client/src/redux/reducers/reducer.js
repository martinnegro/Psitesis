import {
  GET_ALL_ARTICLE,
  GET_ARTICLE_DETAIL,
  GET_USERS,
  SET_USER_ID,
  SET_USER_ROLES,
  ORDER_ARTICLES,
  GET_ARTICLE_TAG,
  GET_ALL_CAT_SUB,
  GET_USERS_BY_ROLES,
  GET_INSTITUTIONS,
  GET_INSTITUTION_BIO,
} from "../actions/actions";

const initialState = {
  articles: [],
  articlesDetail: undefined,
  users: [],
  user_id: undefined,
  user_roles: [],
  orderedArticles: [],
  cat_sub: {},
  usersByRoles: [],
  institutionBio: [],
  institutions: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ARTICLE_DETAIL:
      return {
        ...state,
        articlesDetail: action.payload,
      };
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
    case ORDER_ARTICLES:
      return {
        ...state,
        orderedArticles: action.payload,
      };
    case GET_ARTICLE_TAG:
      return {
        ...state,
        articles: action.payload,
      };
    case GET_ALL_CAT_SUB:
      return {
        ...state,
        cat_sub: action.payload,
      };
    case GET_USERS_BY_ROLES:
      return {
        ...state,
        usersByRoles: action.payload,
      };
    case GET_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };
    case GET_INSTITUTION_BIO:
      return {
        ...state,
        institutionBio: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
