// import { GET_ALL_ARTICLE, GET_ARTICLE_DETAIL } from '../actions/actions'

import { GET_ALL_ARTICLE, GET_ARTICLE_DETAIL, GET_USERS } from "../actions/actions";

const initialState = {
  articles: [],
  articlesDetail: [],
  users: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      console.log('entre al reducer')
      return {
        ...state,
        articles: action.payload
      }
    case GET_ARTICLE_DETAIL:
      return {
        ...state,
        articlesDetail: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
