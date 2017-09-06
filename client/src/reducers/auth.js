// @flow

import { TYPES } from '../actions';

export default function (state = { user: {} }, action) {
  switch (action.type) {
    case TYPES.USER_AUTH:
      return { ...state, error: '', authenticated: true };
    case TYPES.USER_UNAUTH:
      return { ...state, authenticated: false };
    case TYPES.USER_AUTH_ERROR:
      return { ...state, error: action.payload };
    case TYPES.FETCH_DATA:
      return { ...state, message: action.payload };
    case TYPES.FETCH_JSON:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
