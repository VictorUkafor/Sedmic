import axios from 'axios';
import * as types from './actionTypes';

const api = process.env.REACT_APP_BACKEND_API;

export const getUsername = (username, callback) => async (dispatch) => {
  localStorage.setItem('username', username);
  dispatch({
    type: types.GET_USERNAME,
    payload: username,
  });
  callback();
};


export const clearMessage = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES,
  });
};

export const fetchUsernames = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api}/usernames`);

    const usernames = response.data.usernames.map((each) => btoa(each));
    dispatch({
      type: types.GET_USERNAMES,
      payload: usernames,
    });
  } catch (e) {
    dispatch({
      type: types.GET_USERNAMES_ERROR,
      payload: [],
    });
  }
};


export const signup = (body, callback) => async (dispatch) => {
  try {
    await axios.post(`${api}/auth/signup`, body);

    localStorage.removeItem('username');
    localStorage.setItem('tokenSent', true);

    dispatch({
      type: types.SEND_VERIFICATION,
      payload: body.phone,
    });

    if (body.phone) {
      localStorage.setItem('setCode', true);
      callback();
    }
  } catch (e) {
    localStorage.removeItem('username');
    dispatch({
      type: types.SEND_VERIFICATION_ERROR,
      payload: 'There was an error processing this request. Please try again',
    });
  }
};


export const signupViaEmail = (body, token, callback1, callback2) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/confirm-email/${token}`, body);

    localStorage.removeItem('tokenSent');

    if (res.data.user.account_type !== 'diamond') {
      dispatch({
        type: types.SIGNUP_USER,
        payload: res.data.successMessage,
      });

      callback2();
    }

    if (res.data.user.account_type === 'diamond') {
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('auth', true);

      dispatch({
        type: types.LOGIN_USER,
        payload: res.data,
      });

      callback1();
    }
  } catch (e) {
    dispatch({
      type: types.SIGNUP_USER_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};


export const signupViaSMS = (body, callback1, callback2) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/auth/confirm-sms`, body);

    localStorage.removeItem('tokenSent');
    localStorage.removeItem('setCode');

    if (res.data.user.account_type !== 'diamond') {
      dispatch({
        type: types.SIGNUP_USER,
        payload: res.data.successMessage,
      });

      callback2();
    }


    if (res.data.user.account_type === 'diamond') {
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('auth', true);

      dispatch({
        type: types.LOGIN_USER,
        payload: res.data,
      });

      callback1();
    }
  } catch (e) {
    dispatch({
      type: types.SIGNUP_USER_ERROR,
      payload: e.response.data.errorMessage,
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
      payload: e.response.data.errorMessage || 'There was an error processing this request. Please try again',
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

    localStorage.setItem('linkSent', true);
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
