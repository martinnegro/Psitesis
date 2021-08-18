import {
  GET_FORUM_HOME_INFO,

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

    default:
      return state;
  }
}
