import { combineReducers } from "redux";
import rootReducer from "./reducer";
import institutionsReducer from "./institutionsReducer";
import usersReducer from "./usersReducer";
import metadataReducer from "./metadataReducer";
import articlesReducer from "./articlesReducer";
import forumReducer from "./forumReducer";

// combina todos los reducer
export default combineReducers({
  metadataReducer,
  rootReducer,
  institutionsReducer,
  usersReducer,
  articlesReducer,
  forumReducer,
});
