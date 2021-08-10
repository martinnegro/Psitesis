
import { combineReducers } from 'redux';
import  rootReducer  from './reducer';
import institutionsReducer from './institutionsReducer';
import usersReducer from './usersReducer';


// combina todos los reducer
export default combineReducers({
    rootReducer,
    institutionsReducer,
    usersReducer
})