// @flow

import { TYPES } from '../../actions';

export default function (state = { photos: [] }, action) {
  switch (action.type) {
    case TYPES.PHOTOS.PHOTOS_DELETE:
      return {
        ...state,
        photos: [
          ...state.photos.filter(photo => photo._id !== action.payload._id),
        ],
      };
    case TYPES.PHOTOS.PHOTOS_FETCH:
      return { ...state, photos: action.payload };
    case TYPES.PHOTOS.PHOTOS_POST:
      return { ...state, photos: [...state.photos.concat(action.payload)] };
    default:
      return state;
  }
}
