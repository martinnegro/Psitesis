import axios from "axios";
import { deleteCategoryAuth } from "../API";

const { REACT_APP_URL_API } = process.env;

export const GET_ALL_CATEGORIES = "GET ALL CATEGORIES";
export const GET_ALL_CAT_SUB = "GET_ALL_CAT_SUB";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_SUB_CATEGORY = "GET_SUB_CATEGORY";

//////////////////////////////////////
export const GET_ADMINS = "GET_ADMINS";

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
    const response = await deleteCategoryAuth(id);
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

