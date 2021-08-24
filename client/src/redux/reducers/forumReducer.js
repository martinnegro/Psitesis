import {
  GET_FORUM_HOME_INFO,
  GET_FORUM_SUBTOPIC,
  GET_SUB_TOPICS,
} from "../actions/forumActions";

import { GET_COMMENTS_REPORTS } from "../API";

const initialState = {
  topicsAndSubtopics: [],
  last20Post: [],
  forumSubtopics: null,
  subtopics: [],
  commentsReports: [],
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
        state,
        subtopics: payload,
      };
    case GET_COMMENTS_REPORTS:
      return {
        state,
        commentsReports: payload,
      };
    default:
      return state;
  }
}
