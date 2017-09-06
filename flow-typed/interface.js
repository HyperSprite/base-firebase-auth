// @flow
//

export type ReduxActionIF = {
  type: string,
  payload: any,
}

// these are Action Creator Strings, see actions.js file
export type ActionStrings = (
  'FETCH_DATA' |
  'FETCH_JSON' |
  'PAGE_TRANSITION_FALSE' |
  'PAGE_TRANSITION_TRUE' |
  'TOGGLE_MODAL' |
  'PHOTOS_DELETE' |
  'PHOTOS_FETCH' |
  'PHOTOS_POST' |
  'PHOTOS_SWAP_DISPLAY_TRASH' |
  'USER_SET' |
  'USER_AUTH' |
  'USER_AUTH_EDIT' |
  'USER_AUTH_ERROR' |
  'USER_UNAUTH' |
  'USER_AUTH_ERROR'
);
