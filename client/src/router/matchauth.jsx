import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RouteAuthorized = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: props.location } }}
          />
        )
      )}
    />
  );
};

function mapStateToProps(state) {
  const isAuthed = ({ isEmpty, isAnonymous, uid }) => !!(
    !isEmpty && !isAnonymous && uid
  );

  return {
    authenticated: isAuthed(state.firebase.auth),
    errorMessage: state.firebase.authError.message,
  };
}
const FBConnect = firebaseConnect()(RouteAuthorized);
export default connect(
  mapStateToProps,
)(FBConnect);
