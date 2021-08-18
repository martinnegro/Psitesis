import {
  GET_FORUM_HOME_INFO, 
  GET_FORUM_SUBTOPIC

} from "../actions/forumActions";

const initialState = {
  topicsAndSubtopics: [],
  last20Post: [],
  forumSubtopics:[],
 
};

export default function forumReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_FORUM_HOME_INFO:
      return {
        ...state,
        topicsAndSubtopics: payload.topicsAndSub,
        last20Post: payload.last20Post,
      };
      case GET_FORUM_SUBTOPIC:
        return{
          ...state,
          forumSubtopics: payload
        }
    default:
      return state;
  }
}
