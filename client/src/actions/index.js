// @flow

import axios from 'axios';

// Get Types
import { PHOTOS } from '../modules/photos/actions';

// Export actions from sub actions files
export * from '../modules/photos/actions';

const ROOT_URL = process.env.ROOT_URL || '';

// If any of these have a flow error about
// being incompatable with a string enum
// check the ActionStrings in the interface file.
export const TYPES: {[key: ActionStrings]: ActionStrings} = {
  USER_AUTH: 'USER_AUTH',
  USER_AUTH_EDIT: 'USER_AUTH_EDIT',
  USER_UNAUTH: 'USER_UNAUTH',
  USER_AUTH_ERROR: 'USER_AUTH_ERROR',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
  PAGE_TRANSITION_FALSE: 'PAGE_TRANSITION_FALSE',
  PAGE_TRANSITION_TRUE: 'PAGE_TRANSITION_TRUE',
  PHOTOS,
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

console.dir(TYPES);
console.log(TYPES.PHOTOS.PHOTOS_FETCH);

const axiosConfig = () => ({
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

// handle error mesages
export function authError(error) {
  return {
    type: TYPES.USER_AUTH_ERROR,
    payload: error,
  };
}

// Action creators
export function signinUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/auth/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.USER_AUTH });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.USER_AUTH });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return ({ type: TYPES.USER_UNAUTH });
}

export function ifToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return (dispatch) => {
      dispatch({ type: TYPES.USER_AUTH });
    };
  }
}

export function postForm(formProps, relURL, postType) {
  return (dispatch) => {
    axios.post(relURL, formProps, axiosConfig())
      .then((response) => {
        switch (postType) {
          case TYPES.USER_AUTH_EDIT:
            dispatch({
              type: TYPES.USER_AUTH_EDIT,
              payload: response,
            });
            break;
          default:
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function pageTransitionFalse () {
  return (dispatch) => dispatch({ type: TYPES.PAGE_TRANSITION_FALSE });
}

export function toggleModal(options) {
  return {
    type: TYPES.TOGGLE_MODAL,
    payload: options,
  };
}

export function fetchMessage() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/secret`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: response.data.secret,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function fetchData(relURL) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_JSON,
          payload: response.data.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}
