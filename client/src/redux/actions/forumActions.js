import axios from "axios";
const { REACT_APP_URL_API } = process.env;
export const GET_TOPICS_SUBTOPICS = "GET_TOPICS_SUBTOPICS";

export const getTopicsAndSubTopics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_API}/topics/subtopics`);
      dispatch({ type: GET_TOPICS_SUBTOPICS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};
