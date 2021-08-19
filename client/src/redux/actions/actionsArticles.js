import axios from "axios";
import { getArticleWhithoutSectionAuth } from "../API";

const { REACT_APP_URL_API } = process.env;

export const GET_ALL_ARTICLE = "GET ALL ARTICLE";
export const GET_ARTICLE_DETAIL = "GET ARTICLE DETAIL";
export const ORDER_ARTICLES = "ORDER_ARTICLES";
export const GET_ARTICLE_TAG = "GET_ARTICLE_TAG";
export const GET_ARTICLE_WITHOUT_SECTION = "GET_ARTICLE_WITHOUT_SECTION";

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

export const orderArticles = (orderBy, order) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `${REACT_APP_URL_API}/article?orderBy=${orderBy}&order=${order}`
        );
        dispatch({
          type: ORDER_ARTICLES,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };


export function getArticleTag(tag) {
    return function (dispatch) {
      return axios
        .get(`${REACT_APP_URL_API}/search?search=${tag}`)
        .then((response) => response.data)
        .then((json) => {
          dispatch({ type: GET_ARTICLE_TAG, payload: json });
        });
    };
  }

export const getArticleWhithoutSection = () => {
  return async dispatch => {
    try {
        const response = await getArticleWhithoutSectionAuth()
        dispatch({
          type: GET_ARTICLE_WITHOUT_SECTION,
          payload: response.data
        })
    } catch (error) {
      console.log(error)
    }
  }
}