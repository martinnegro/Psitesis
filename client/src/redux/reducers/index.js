import { combineReducers } from "redux";
import authReducer from "./authReducer";
import rootReducer from "./reducer";
import institutionsReducer from "./institutionsReducer";
import usersReducer from "./usersReducer";
import metadataReducer from "./metadataReducer";
import articlesReducer from "./articlesReducer";
import forumReducer from "./forumReducer";
import notificationsReducer from "./notificationsReducer";

// combina todos los reducer
export default combineReducers({
  authReducer,
  metadataReducer,
  rootReducer,
  institutionsReducer,
  usersReducer,
  articlesReducer,
  forumReducer,
  notificationsReducer,
});
