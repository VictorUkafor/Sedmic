import axios from 'axios';
import * as types from './actionTypes';

const authToken = localStorage.getItem('authToken');
const api = process.env.REACT_APP_BACKEND_API;

export const createChurch = (body, callback) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/church`, body,
      { headers: { Authorization: `Bearer ${authToken}` } });

    localStorage.removeItem('isSignup');
    localStorage.setItem('churchCreated', true);

    dispatch({
      type: types.CREATE_CHURCH,
      payload: res.data.church,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.CREATE_CHURCH_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};


export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/profile`,
      { headers: { Authorization: `Bearer ${authToken}` } });

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data.user,
    });
  } catch (e) {
    dispatch({
      type: types.GET_PROFILE_ERROR,
      payload: e.response.data.errorMessage,
    });
  }
};
