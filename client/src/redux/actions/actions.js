import axios from "axios";
import { GET_ARTICLE_TAG } from "./actionsArticles";

const { REACT_APP_URL_API } = process.env;

export const GET_ALL_CATEGORIES = "GET ALL CATEGORIES";
export const GET_USERS = "GET USERS";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_ROLES = "SET_USER_ROLES";
export const GET_ALL_CAT_SUB = "GET_ALL_CAT_SUB";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_SUB_CATEGORY = "GET_SUB_CATEGORY";
export const GET_USERS_BY_ROLES = "GET_USERS_BY_ROLES";
export const GET_ADMINS = "GET_ADMINS";


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

export const setCategory = (body, token) => async (dispatch) => {
  try {
    const categoryData = {
      id: body.id,
      name: body.name,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${REACT_APP_URL_API}/categories`,
      categoryData,
      {
        headers,
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const setSubCategory = (body, token) => async (dispatch) => {
  try {
    const categoryData = {
      id: body.id,
      name: body.name,
      description: body.description,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${REACT_APP_URL_API}/subcategories`,
      categoryData,
      {
        headers,
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const deleteCategory = (id, token) => async (dispatch) => {
  try {
    console.log("eliminar");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${REACT_APP_URL_API}/categories/${id}`,
      {
        headers,
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const deleteSubCategory = (id, token) => async (dispatch) => {
  try {
    console.log("eliminar");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${REACT_APP_URL_API}/subcategories/${id}`,
      {
        headers,
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createNewCategory = (newCategory, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${REACT_APP_URL_API}/categories`,
      newCategory,
      {
        headers,
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ALL_CAT_SUB,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createNewSubCategory =
  (newSubCategory, token) => async (dispatch) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${REACT_APP_URL_API}/subcategories`,
        newSubCategory,
        {
          headers,
        }
      );
      if (response.data) {
        dispatch({
          type: GET_ALL_CAT_SUB,
          payload: response.data,
        });
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
    await axios.put(
      `${REACT_APP_URL_API}/article/${editPost.art_id}`,
      editPost,
      {
        headers,
      }
    );
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

export const getCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(`${REACT_APP_URL_API}/categories/${id}`);
      dispatch({
        type: GET_CATEGORY,
        payload: {
          data: response.data,
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUsersByRoles = (rol) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_URL_API}/users?rol=${rol}`);
      dispatch({
        type: GET_USERS_BY_ROLES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSubCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `${REACT_APP_URL_API}/subcategory/category/${id}`
      );
      console.log("response: ", response.data);
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: {
          data: response.data,
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

