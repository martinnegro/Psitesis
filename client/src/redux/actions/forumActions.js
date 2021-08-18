import axios from "axios";
const { REACT_APP_URL_API } = process.env;
export const GET_FORUM_HOME_INFO = "GET_FORUM_HOME_INFO";
export const POST_COMMENT = "POST_COMMENT";
export const getForumHomeInfo = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_API}/forum_home`);
      dispatch({ type: GET_FORUM_HOME_INFO, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};
