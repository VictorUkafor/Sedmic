import axios from 'axios';
import * as types from './actionTypes';

export const getUsername = (username, callback) => async (dispatch) => {
  dispatch({
    type: types.GET_USERNAME,
    payload: username,
  });
  callback();
};


export const clearUsername = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_USERNAME,
  });
};


export const clearMessage = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES,
  });
};

export const fetchUsernames = () => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/usernames');

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


export const signup = (body) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/signup', body);
    let message = '';
    if (body.email) {
      message = 'A verification email has been sent for the next step';
    } else {
      message = 'A verification code has been sent to your phone';
    }
    dispatch({
      type: types.SEND_VERIFICATION,
      payload: message,
    });
  } catch (e) {
    dispatch({
      type: types.SEND_VERIFICATION_ERROR,
      payload: 'There is an error processing this request. Please try again',
    });
  }
};
