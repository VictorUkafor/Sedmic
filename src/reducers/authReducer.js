import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case types.SEND_VERIFICATION:
      return {
        ...state,
        successMessage: action.payload,
      };
    case types.SEND_VERIFICATION_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.GET_USERNAMES:
      return {
        ...state,
        checks: action.payload,
      };
    case types.GET_USERNAMES_ERROR:
      return {
        ...state,
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
      };

    case types.CLEAR_USERNAME:
      return {
        ...state,
        username: '',
      };
    default:
      return state;
  }
};
