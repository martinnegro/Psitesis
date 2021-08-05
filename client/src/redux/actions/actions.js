import axios from "axios";

const URL_API = "http://localhost:3001";

export const GET_ALL_ARTICLE = 'GET ALL ARTICLE';
export const GET_ARTICLE_DETAIL = 'GET ARTICLE DETAIL';
export const GET_USERS = 'GET USERS';

const APIURL = "http://localhost:3001";
// This actions destroy the project 
// export async function callApiPost() {
//   return function () {
  //     try {
//       const token = await getAccessTokenSilently();
//       const response = await axios({
//         method: "post",
//         url: `${URL_API}/article/`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data);
//       console.log(user.sub);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// }

export const getAllArticle = () => {
  return async dispatch => {
      try {
          const response = await axios(`${URL_API}/article`);
          dispatch({
              type: GET_ALL_ARTICLE,
              payload: response.data
          });            
      } catch (error) {
          console.error(error)
      }
  }
}

export const getArticleDetail = (id) => (dispatch) => {
	axios.get(`${URL_API}/article/${id}`)
	.then(respuesta => {
	  dispatch({ type: GET_ARTICLE_DETAIL, payload: respuesta.data });
	})
	.catch((err) => {
	  console.log(err);
	});
};

export const clearDetail = () =>  {
  return {type: GET_ARTICLE_DETAIL, payload: undefined};	
};

export const getAllUsers = () => {
  return async dispatch => {
      try {
          const response = await axios.get(`${URL_API}/users`);
          dispatch({
              type: GET_USERS,
              payload: response.data
          });            
      } catch (error) {
          console.error(error)
      }
  }
}


export const findOrCreateUser = (newPost, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post(`${URL_API}/users`, newPost, { headers });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createPost = (newPost, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post(`${URL_API}/article`, newPost, { headers });
  } catch (err) {
    console.log(err);
    return;
  }
};

