import axios from 'axios';
import * as types from './actionTypes';

const api = process.env.REACT_APP_BACKEND_API;


export const clearMessage = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES,
  });
};


export const signup = (body, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/signup`, body);

    dispatch({
      type: types.SEND_VERIFICATION,
      payload: res.data.successMessage,
    });

    if (body.phone) {
      callback();
    }
  } catch (e) {
    dispatch({
      type: types.SEND_VERIFICATION_ERROR,
      payload: e.response.data,
    });
  }
};


export const signupViaEmail = (body, token, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/confirm-email/${token}`, body);

    if (res.data.user.account_type === 'diamond') {
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('auth', true);

      dispatch({
        type: types.LOGIN_USER,
        payload: res.data,
      });

      callback();
    }

    if (res.data.user.account_type !== 'diamond') {
      dispatch({
        type: types.SIGNUP_USER,
        payload: res.data.successMessage,
      });
    }
  } catch (e) {
    dispatch({
      type: types.SIGNUP_USER_ERROR,
      payload: e.response.data,
    });
  }
};


export const signupViaSMS = (body, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/confirm-sms`, body);

    if (res.data.user.account_type === 'diamond') {
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('auth', true);

      dispatch({
        type: types.LOGIN_USER,
        payload: res.data,
      });

      callback();
    }

    if (res.data.user.account_type !== 'diamond') {
      dispatch({
        type: types.SIGNUP_USER,
        payload: res.data.successMessage,
      });
    }
  } catch (e) {
    dispatch({
      type: types.SIGNUP_USER_ERROR,
      payload: e.response.data,
    });
  }
};


export const loginUser = (body, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/login`, body);

    localStorage.setItem('authToken', res.data.token);
    localStorage.setItem('auth', true);

    dispatch({
      type: types.LOGIN_USER,
      payload: res.data,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.LOGIN_USER_ERROR,
      payload: e.response.data.errorMessage
      || 'There was an error processing this request. Please try again',
    });
  }
};


export const verifyToken = (token, callback) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/auth/confirm-token?token=${token}`);

    localStorage.setItem('activation_token', token);
    dispatch({
      type: types.VERIFY_TOKEN,
      payload: res.data.user,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.VERIFY_TOKEN_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};


export const verifyCode = (code, callback) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/auth/confirm-code?code=${code}`);

    localStorage.setItem('activation_token', code);

    dispatch({
      type: types.VERIFY_CODE,
      payload: res.data.user,
    });
    callback();
  } catch (e) {
    dispatch({
      type: types.VERIFY_CODE_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};


export const logOut = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: types.LOGOUT });
};


export const forgotPassword = (body) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/password-reset/request`, body);

    dispatch({
      type: types.FORGOT_PASSWORD,
      payload: res.data.successMessage,
    });
  } catch (e) {
    dispatch({
      type: types.FORGOT_PASSWORD_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};


export const findResetToken = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/auth/password-reset/find/${token}`);

    dispatch({
      type: types.FIND_RESET,
      payload: res.data.successMessage,
    });
  } catch (e) {
    dispatch({
      type: types.FIND_RESET_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};

export const resetPassword = (body, token) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/password-reset/reset/${token}`, body);

    localStorage.removeItem('linkSent');
    dispatch({
      type: types.RESET_PASSWORD,
      payload: res.data.successMessage,
    });
  } catch (e) {
    dispatch({
      type: types.RESET_PASSWORD_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};
