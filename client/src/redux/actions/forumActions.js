import axios from "axios";
const { REACT_APP_URL_API } = process.env;
export const GET_FORUM_HOME_INFO = "GET_FORUM_HOME_INFO";
export const GET_SUB_TOPICS = "GET_SUB_TOPICS";
export const GET_FORUM_SUBTOPIC = "GET_FORUM_SUBTOPICS";
// export const GET_FORUM_POST = "GET_FORUM_POST";
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

export function getForumSubtopic(id){
  return function(dispatch){
    return axios.get(`${REACT_APP_URL_API}/subtopics/${id}`)
    .then(response => response.data)
    .then(json =>{
      dispatch({ type: GET_FORUM_SUBTOPIC, payload:json})
    })
  }
}

export function getSubtopic(){
  return function(dispatch){
    return axios.get(`${REACT_APP_URL_API}/subtopics`)
    .then(response => response.data)
    .then(json =>{
      dispatch({ type: GET_SUB_TOPICS, payload:json})
    })
  }
}

// export function getForumPost(id){
//   return function(dispatch){
//     return axios.get(`${REACT_APP_URL_API}/forumpost/${id}`)
//     .then(response => response.data)
//     .then(json =>{
//       dispatch({ type: GET_FORUM_POST, payload:json})
//     })
//   }
// }
