import {
  GET_FORUM_HOME_INFO,
  GET_FORUM_SUBTOPIC,
  GET_SUB_TOPICS,
} from "../actions/forumActions";

import { GET_REPORTS } from "../API";

const initialState = {
  topicsAndSubtopics: [],
  last20Post: [],
  forumSubtopics: null,
  subtopics: [],
  reports: [],
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
      return {
        ...state,
        forumSubtopics: payload,
      };
    case GET_SUB_TOPICS:
      console.log(payload);
      return {
        ...state,
        subtopics: payload,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: payload,
      };

    default:
      return state;
  }
}
