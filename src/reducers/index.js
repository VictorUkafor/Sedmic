import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import authReducer from './authReducer';
import churchReducer from './churchReducer';


export default combineReducers({
  location: locationReducer,
  auth: authReducer,
  user: churchReducer,
});
