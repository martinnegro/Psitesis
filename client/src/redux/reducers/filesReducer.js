import {
  GET_ALL_FILES, 
  ADD_FILE, 
  REMOVE_FILE
} from "../actions/fileActions";

const initialState = {
  files:{},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      }
      case REMOVE_FILE:
        return {
          ...state,
          files: state.files.filter(file => file.id !== action.payload),
        } 
      case GET_ALL_FILES: 
          return {
          ...state,
          files: action.payload,
        }   
    default:
      return state;
  }
}

export default rootReducer;
