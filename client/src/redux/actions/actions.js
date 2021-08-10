<<<<<<< HEAD
import axios from 'axios';
const URL_API = 'http://localhost:3001';
=======
import axios from "axios";

const { REACT_APP_URL_API } = process.env
>>>>>>> main

export const GET_ALL_ARTICLE = "GET ALL ARTICLE";
export const GET_ARTICLE_DETAIL = "GET ARTICLE DETAIL";
export const GET_USERS = "GET USERS";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_ROLES = "SET_USER_ROLES";
export const ORDER_ARTICLES = "ORDER_ARTICLES";
export const GET_ALL_CAT_SUB = "GET_ALL_CAT_SUB";

export const getAllArticle = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`${REACT_APP_URL_API}/article`);
      dispatch({
        type: GET_ALL_ARTICLE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getArticleDetail = (id) => (dispatch) => {
  axios
    .get(`${REACT_APP_URL_API}/article/${id}`)
    .then((respuesta) => {
      dispatch({ type: GET_ARTICLE_DETAIL, payload: respuesta.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearDetail = () => {
  return { type: GET_ARTICLE_DETAIL, payload: undefined };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_API}/users`);
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const findOrCreateUser = (user, token) => async (dispatch) => {
  try {
    const userPost = {
      user_id_A0: user.sub,
      user_name: user.name,
      user_email: user.email,
      user_img_profile: user.picture,
      inst_id: [],
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${REACT_APP_URL_API}/users`, userPost, {
      headers,
    });
    if (response.data.user_id) {
      dispatch(setUserID(response.data.user_id));
    }
    if (response.data.roles) {
      dispatch(setUserRoles(response.data.roles));
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const setUserID = (payload) => {
  return { type: SET_USER_ID, payload: payload };
};

export const setUserRoles = (payload) => {
  return { type: SET_USER_ROLES, payload: payload };
};

export const createPost = (newPost, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post(`${REACT_APP_URL_API}/article`, newPost, { headers });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const editPost = (editPost, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.put(`${REACT_APP_URL_API}/article/${editPost.art_id}`, editPost, {
      headers,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const deletePost = (art_id, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${REACT_APP_URL_API}/article/${art_id}`, {
      headers,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const orderArticles = (orderBy, order) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${REACT_APP_URL_API}/article?orderBy=${orderBy}&order=${order}`
      );
      console.log(response.data);
      dispatch({
        type: ORDER_ARTICLES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCatSub = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`${REACT_APP_URL_API}/categories`);
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
