// @flow

import axios from 'axios';

import { TYPES } from '../../actions';

const ROOT_URL = process.env.ROOT_URL || '';

export const PHOTOS: {[key: ActionStrings]: ActionStrings} = {
  PHOTOS_DELETE: 'PHOTOS_DELETE',
  PHOTOS_FETCH: 'PHOTOS_FETCH',
  PHOTOS_POST: 'PHOTOS_POST',
  PHOTOS_SWAP_DISPLAY_TRASH: 'PHOTOS_SWAP_DISPLAY_TRASH',
};

const axiosConfig = () => ({
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

export function fetchPhotos(relURL, fetchType) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, axiosConfig())
      .then((response) => {
        switch (fetchType) {
          case TYPES.PHOTOS.PHOTOS_FETCH:
            dispatch({
              type: TYPES.PHOTOS.PHOTOS_FETCH,
              payload: response.data,
            });
            break;
          case TYPES.PHOTOS.PHOTOS_SWAP_DISPLAY_TRASH:
            dispatch({
              type: TYPES.PHOTOS.PHOTOS_SWAP_DISPLAY_TRASH,
              payload: response.data,
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

export function postPhotos(formProps, relURL, postType) {
  return (dispatch) => {
    axios.post(relURL, formProps, axiosConfig)
      .then((response) => {
        switch (postType) {
          case TYPES.PHOTOS.PHOTOS_POST:
            dispatch({
              type: TYPES.PHOTOS.PHOTOS_POST,
              payload: response.data,
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

export function patchPhotos(id, relURL, update, postType) {
  return (dispatch) => {
    axios.patch(`${relURL}/${id}`, update, axiosConfig)
      .then((response) => {
        switch (postType) {
          case TYPES.PHOTOS.PHOTOS_DELETE:
            dispatch({
              type: TYPES.PHOTOS.PHOTOS_DELETE,
              payload: response.data,
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
