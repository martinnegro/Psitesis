import {
  GET_ALL_CAT_SUB,
  GET_CATEGORY,
  GET_SUB_CATEGORY,
} from "../actions/actions";

import {GET_FORUM_SUBTOPIC} from '../actions/forumActions'

const initialState = {
  cat_sub: {},
  category: {},
  subCategory:{},
  forumSubtopics:{}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

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
      
    default:
      return state;
  }
}

export default rootReducer;
