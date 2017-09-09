import { applyMiddleware, compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import { loadState, saveState } from './localstorage';
import { TYPES } from '../actions';
import reducers from '../reducers';
import firebaseConfig from './config.firebase';

const persitedState = loadState();
const token = localStorage.getItem('token');

firebase.initializeApp(firebaseConfig);

const firebaseLocalConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
};

const prodMiddleware = [
  promise(),
  thunk,
];

const devMiddleware = [
  promise(),
  thunk,
  createLogger(),
];

let middlewareOptions;

if (process.env.NODE_ENV === 'production') {
  middlewareOptions = applyMiddleware(...prodMiddleware);
} else {
  middlewareOptions = composeWithDevTools(
    applyMiddleware(...devMiddleware),
    // other store enhancers if any
  );
}

const store = createStore(
  reducers,
  persitedState,
  compose(
    reactReduxFirebase(firebase, firebaseLocalConfig),
    middlewareOptions
    )
  );

store.subscribe(() => {
  saveState({
    photos: store.getState().photos,
  });
});

if (token) {
  store.dispatch({ type: TYPES.USER_AUTH });
}

export default store;
