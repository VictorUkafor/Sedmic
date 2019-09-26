import axios from 'axios';
import * as types from './actionTypes';

export const locationInfo = () => async (dispatch) => {
  try {
    const location = await axios.get('https://ipapi.co/json/');
    
    dispatch({
      type: types.CURRENT_LOCATION,
      payload: location.data,
    });
  } catch (error) {
    dispatch({
      type: types.CURRENT_LOCATION_ERROR,
      payload: 'error',
    });
  }
};
