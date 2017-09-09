import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const propTypes = {
  signoutUser: PropTypes.func,
};

class Signout extends Component {
  componentWillMount() {
    this.props.firebase.logout();
  }

  render() {
    return (
      <div>Sorry to see you go...</div>
    );
  }
}

Signout.propTypes = propTypes;
const FBConnect = firebaseConnect()(Signout);
export default connect(null, actions)(FBConnect);
