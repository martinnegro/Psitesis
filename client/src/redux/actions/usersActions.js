import * as API from "../API";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const IS_FETCHING_USERS = "IS_FETCHING_USERS";
export const GET_USERS_BY_ROLES = "GET_USERS_BY_ROLES";
export const SET_USER_DETAIL = "GET_USERS_BY_ROLES";
export const GET_USERS_ADMIN = "GET_USERS_ADMIN";
export const GET_USERS_COLABORATOR = "GET_USERS_COLABORATOR";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(isFetchingUsers());
      const response = await API.getAllUsers();
      dispatch({ type: GET_ALL_USERS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export function isFetchingUsers() {
  return {
    type: IS_FETCHING_USERS,
  };
}

export const getUserDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await API.getUserDetail(id);
      if (response?.data?.message === "successful") {
        dispatch(setUserDetail(response.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserDetail = (payload) => {
  return { type: SET_USER_DETAIL, payload: payload };
};

export const clearUserDetail = () => {
  return { type: SET_USER_DETAIL, payload: null };
};

export const getUsersByRoles = (rolID) => {
  return async (dispatch) => {
    try {
      const response = await API.getUsersByRoles(rolID);
      dispatch({ type: GET_USERS_BY_ROLES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsersAdmin = (rolIDAdmin) => {
  return async (dispatch) => {
    try {
      const response = await API.getUsersByRoles(rolIDAdmin);
      dispatch({ type: GET_USERS_ADMIN, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsersColaborator = (rolIDColaborator) => {
  return async (dispatch) => {
    try {
      const response = await API.getUsersByRoles(rolIDColaborator);
      dispatch({ type: GET_USERS_COLABORATOR, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
