import { GET_TOPICS_SUBTOPICS } from "../actions/forumActions";
const initialState = {
  topicsAndSubtopics: [],
};

export default function forumReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_TOPICS_SUBTOPICS:
      return {
        ...state,
        topicsAndSubtopics: payload,
      };
    default:
      return state;
  }
}
