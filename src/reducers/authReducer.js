import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_VERIFICATION:
      return {
        ...state,
        successMessage: action.payload,
      };
    case types.SEND_VERIFICATION_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage || '',
        errors: action.payload.errors || {},
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
        errors: {},
      };
    case types.VERIFY_TOKEN:
      return {
        ...state,
        tokenUser: action.payload,
        successMessage: '',
        errorMessage: '',
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
        successMessage: action.payload.successMessage,
      };
    case types.SIGNUP_USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage || '',
        errors: action.payload.errors || {},
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
