import axios from 'axios';
const { REACT_APP_URL_API } = process.env

export const GET_ALL_USERS     = 'GET_ALL_USERS';
export const IS_FETCHING_USERS = 'IS_FETCHING_USERS';
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_ROLES = "SET_USER_ROLES";
export const GET_USERS_BY_ROLES = "GET_USERS_BY_ROLES";

export function getAllUsers() {
    return function (dispatch) {
        dispatch(isFetchingUsers())
        return axios.get(`${REACT_APP_URL_API}/users`)
                    .then(response => dispatch({ type: GET_ALL_USERS, payload: response.data }))
    }; 
};

export function isFetchingUsers() {
    return {
        type: IS_FETCHING_USERS
    }
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