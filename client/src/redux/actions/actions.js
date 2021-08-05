import axios from "axios";

const APIURL = "http://localhost:3001";

export const findOrCreateUser = (newPost, token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post(`${APIURL}/users`, newPost, { headers });
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
    await axios.post(`${APIURL}/article`, newPost, { headers });
  } catch (err) {
    console.log(err);
    return;
  }
};
