import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, ButtonGroup, Form, FormGroup } from 'react-bootstrap';

import * as actions from '../../actions';
import validate from './../form/validate';
import Input from './../form/input';
import Alert from './../form/alert';

const propTypes = {
  authenticated: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onRequestHide: PropTypes.func,
  signinUser: PropTypes.func,
  onClickifToken: PropTypes.func,
  ifToken: PropTypes.func,
};


let Signup = class Signup extends Component {
  constructor(props) {
    super(props);
    // this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.firebase.createUser(formProps);
  }

  componentDidUpdate() {
    if (this.props.modal && this.props.authenticated ) {
      this.handleSubmitSuccess();
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }

  handleSubmitSuccess() {
    if (!this.props.firebase.auth.isEmpty) {
      this.props.onRequestHide();
    }
  }

  render() {
    const { handleSubmit, authenticated, pristine, reset, submitting } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/user-wizard" />
      );
    }
    return (
      <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <FormGroup>
          <Field
            component={Input}
            label="Email:"
            name="email"
            type="email"
            placeholder="Type your email"
            shouldFocus
          />
        </FormGroup>
        <FormGroup>
          <Field
            component={Input}
            label="Password:"
            name="password"
            type="password"
            placeholder="Choose a password"
          />
        </FormGroup>
        <FormGroup>
          <Field
            component={Input}
            label="Confirm Password:"
            name="passwordConfirm"
            type="password"
            placeholder="Retype your password"
          />
        </FormGroup>
        { this.renderAlert() }
        <ButtonGroup>
          <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>Submit</Button>
          <Button type="button" bsStyle="info" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
        </ButtonGroup>
      </Form>
    );
  }
};

Signup.propTypes = propTypes;

function mapStateToProps(state) {
  const isAuthed = ({ isEmpty, isAnonymous, uid }) => !!(
    !isEmpty && !isAnonymous && uid
  );

  return {
    authenticated: isAuthed(state.firebase.auth),
    errorMessage: state.firebase.authError && state.firebase.authError.message,
  };
}

Signup = reduxForm({
  form: 'signup',
  validate,
})(Signup);

const FBConnect = firebaseConnect()(Signup);
export default connect(mapStateToProps, actions)(FBConnect);
