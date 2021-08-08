
import { combineReducers } from 'redux';
import  rootReducer  from './reducer';
import institutionsReducer from './institutionsReducer';


// combina todos los reducer
export default combineReducers({
    rootReducer,
    institutionsReducer
})