import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CURRENT_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case types.CURRENT_LOCATION_ERROR:
      return {
        ...state,
        locationError: action.payload,
      };
    default:
      return state;
  }
};
