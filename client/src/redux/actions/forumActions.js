import axios from "axios";
const { REACT_APP_URL_API } = process.env;
export const GET_FORUM_HOME_INFO = "GET_FORUM_HOME_INFO";

export const getForumHomeInfo = () => {
  return async (dispatch) => {
    try {
      // TRAE TODA LA INFO NECESARIA PARA FORUM HOME.
      // ESTRUCTURA DE RESPUESTA:
      // {
      //    topicsAndSub: [
      //      topic1: { CADA TOPIC TRAE SUS SUBTOPICS
      //        subtopic: {}  
      //      },  
      //    ],
      //    last20Post: [ARRAY CON CADA POST]
      // }
      const response = await axios.get(`${REACT_APP_URL_API}/forum_home`);
      dispatch({ type: GET_FORUM_HOME_INFO, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};
