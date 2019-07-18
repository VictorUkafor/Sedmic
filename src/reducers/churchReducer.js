import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        auth: true,
      };
    case types.GET_PROFILE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.CREATE_CHURCH:
      return {
        ...state,
        church: action.payload,
      };
    case types.CREATE_CHURCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
