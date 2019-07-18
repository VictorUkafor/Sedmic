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
    case types.VERIFY_TOKEN:
      return {
        ...state,
        tokenUser: action.payload,
      };
    case types.VERIFY_TOKEN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.VERIFY_CODE:
      return {
        ...state,
        tokenUser: action.payload,
      };
    case types.VERIFY_CODE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.SIGNUP_USER:
      return {
        ...state,
        successMessage: action.payload,
      };
    case types.SIGNUP_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        auth: true,
      };
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: {},
      };
    case types.FORGOT_PASSWORD:
      return {
        ...state,
        successMessage: action.payload,
        linkSent: true,
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.FIND_RESET:
      return {
        ...state,
        reset: true,
      };
    case types.FIND_RESET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.RESET_PASSWORD:
      return {
        ...state,
        successMessage: action.payload,
        linkSent: false,
      };
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
