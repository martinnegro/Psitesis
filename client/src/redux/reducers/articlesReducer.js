import {
  GET_ALL_ARTICLE,
  GET_ARTICLE_DETAIL,
  ORDER_ARTICLES,
  GET_ARTICLE_TAG,
  GET_ARTICLE_WITHOUT_SECTION,
} from "../actions/actionsArticles";

const initialState = {
  articles: [],
  articlesDetail: undefined,
  orderedArticles: [],
  ArticleWithoutSection:[],
};

export default function articlesReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case GET_ALL_ARTICLE:
      return {
        ...state,
        articles: payload,
      };
    case GET_ARTICLE_DETAIL:
      return {
        ...state,
        articlesDetail: payload,
      };
    case ORDER_ARTICLES:
      return {
        ...state,
        orderedArticles: payload,
      };
    case GET_ARTICLE_TAG:
      return {
        ...state,
        orderedArticles: payload,
      };
    case GET_ARTICLE_WITHOUT_SECTION:
      return{
        ...state,
        ArticleWithoutSection: payload
      }
    default:
      return state;
  }
}
