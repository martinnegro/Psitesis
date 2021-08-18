import axios from "axios";
const { REACT_APP_URL_API } = process.env;
export const GET_FORUM_HOME_INFO = "GET_FORUM_HOME_INFO";
export const GET_FORUM_SUBTOPIC = "GET_FORUM_SUBTOPICS";
export const GET_FORUM_POST = "GET_FORUM_POST";

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

export function getForumSubtopic(id){
  return function(dispatch){
    return axios.get(`${REACT_APP_URL_API}/subtopics/${id}`)
    .then(response => response.data)
    .then(json =>{
      dispatch({ type: GET_FORUM_SUBTOPIC, payload:json})
    })
  }
}

export function getForumPost(id){
  return function(dispatch){
    return axios.get(`${REACT_APP_URL_API}/forumpost/${id}`)
    .then(response => response.data)
    .then(json =>{
      dispatch({ type: GET_FORUM_POST, payload:json})
    })
  }
}
