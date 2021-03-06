import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formValueSelector, reduxForm, reset } from 'redux-form';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// eslint-disable-next-line
import * as actions from '../../actions';

import formValues from './form-values';
import Alert from '../form/alert';
import validate from './validate-user';
// import asyncValidate from '../../containers/async-validate';

import ViewSwitch from '../form/view/switch';
import EditSwitch from '../form/edit/switch';

const relURL = '/auth/edituser';
const thisForm = 'userdata';
const selector = formValueSelector(thisForm);

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  eventSelector: PropTypes.object.isRequired,
  errorMessage: PropTypes.object,
  firebase: PropTypes.any,
  form: PropTypes.string,
  handleSubmit: PropTypes.func,
  pageTransitionFalse: PropTypes.func.isRequired,
  postForm: PropTypes.func.isRequired,
};

const defaultProps = {
  errorMessage: undefined,
  transitionPage: false,
  form: thisForm,
};

let UserEdit = class UserEdit extends Component {
  constructor() {
    super();
    this.setPage = this.setPage.bind(this);
    this.state = { page: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
  }

  componentWillUnmount() {
    this.props.pageTransitionFalse();
  }

  handleFormSubmit(formProps) {
    this.props.firebase.updateProfile(formProps);
    this.setState({ page: null });
  }

  cancelFormEdit() {
    this.props.dispatch(reset('userdata'));
    this.setState({ page: null });
  }


  setPage(pageNumber) {
    this.setState({ page: pageNumber });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    return errorMessage && (
      Object.keys(errorMessage)
        .map(key => errorMessage[key])
        .map(eM => Alert(eM.path, 'Opps', eM.message))
    );
  }

  render() {
    const {
      authenticated,
      eventSelector,
      handleSubmit,
    } = this.props;

    const {
      page,
    } = this.state;

    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }

    return (
      <div className="" >
        <div className="col-md-3 col-sm-1" />
        <div className="form-main col-md-5 col-sm-10">
          <LinkContainer to="/user-wizard" >
            <Button
              type="button"
              bsStyle="info"
            >
              Use the Wizard
            </Button>
          </LinkContainer>

          {formValues.map((fV, i) => (
            (i + 1 === page) ? (
              <EditSwitch
                form={this.props.form}
                key={`${fV.contentName}edit`}
                formValues={fV}
                content={eventSelector[fV.contentName]}
                auxButton={this.cancelFormEdit}
                auxButtonLabel="Cancel"
                onSubmit={handleSubmit(this.handleFormSubmit)}
                submitLabel="Save"
              />
            ) : (
              <ViewSwitch
                key={`${fV.contentName}static`}
                content={eventSelector[fV.contentName]}
                formValues={fV}
                setPage={this.setPage}
                thisPage={i + 1}
              />
            )
          ))}
          { this.renderAlert() }

        </div>
        <div className="col-md-4 col-sm-1" />
      </div>
    );
  }
};

function mapStateToProps(state) {
  const initialValues = state.firebase.profile;
  const isAuthed = ({ isEmpty, isAnonymous, uid }) => !!(
    !isEmpty && !isAnonymous && uid
  );

  return {
    authenticated: isAuthed(state.firebase.auth),
    errorMessage: state.firebase.authError.message,
    transitionPage: state.page.transitionPage,
    initialValues,
    eventSelector: selector(state, ...formValues.map(fV => fV.contentName)),
  };
}

UserEdit = reduxForm({
  enableReinitialize: true,
  validate,
})(UserEdit);

UserEdit.propTypes = propTypes;
UserEdit.defaultProps = defaultProps;

const FBConnect = firebaseConnect()(UserEdit);
export default connect(mapStateToProps, actions)(FBConnect);
