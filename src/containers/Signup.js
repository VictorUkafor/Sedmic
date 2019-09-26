import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup, clearMessage } from '../actions/authActions';
import { locationInfo } from '../actions/locationActions';
import {
  validateUsername,
  validateEmail,
  validatePhone,
} from '../libs/validations';
import Input from '../components/Field/Input';
import Phone from '../components/Field/Phone';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const initialState = {
  username: '',
  email: '',
  mobileNumber: '',
  errors: {
    username: '',
    email: '',
    mobileNumber: '',
  },
  noErrors: false,
  loading: false,
  usernameSet: false,
  verificationMethod: '',
  submit: false,
};

class Signup extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: clear,
      locationInfo: geoInfo,
    } = this.props;

    clear();
    geoInfo();


    document.title = 'Sedmic - Let\'s Get You Started';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processUsername = () => {
    const { username } = this.state;
    const { clearMessage: clear } = this.props;

    clear();
    this.setState({ activationMethod: '' });

    const validation = validateUsername(username.trim());
    const { message, status } = validation;
    this.setState({
      errors: { username: message },
      usernameSet: status,
      noErrors: status,
    });

    return { status };
  }


  usingSMS = (event) => {
    event.preventDefault();
    this.setState({
      activationMethod: 'sms',
      usernameSet: false,
    });
  }


  usingEmail = (event) => {
    event.preventDefault();
    this.setState({
      activationMethod: 'email',
      usernameSet: false,
    });
  }

  processMobile = () => {
    const { mobileNumber } = this.state;
    const { clearMessage: clear, location } = this.props;

    const { country } = location;

    clear();

    const digits = { NG: 11 };

    const validation = validatePhone(mobileNumber.trim(), true, digits[country]);
    const { message, status } = validation;
    this.setState({
      errors:
      { mobileNumber: message },
      noErrors: status,
    });

    return { status };
  }


  processEmail = () => {
    const { email } = this.state;
    const { clearMessage: clear } = this.props;
    clear();

    const validation = validateEmail(email.trim());
    const { message, status } = validation;
    this.setState({
      errors:
      { email: message },
      noErrors: status,
    });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      signup: verification,
      history, clearMessage: clear,
    } = this.props;

    clear();

    const { activationMethod } = this.state;

    let checkStatus = true;

    if (checkStatus) {
      const { status } = this.processUsername();
      checkStatus = status;
    }

    if (checkStatus && activationMethod === 'email') {
      const { status } = this.processEmail();
      checkStatus = status;
    }

    if (checkStatus && activationMethod === 'sms') {
      const { status } = this.processMobile();
      checkStatus = status;
    }


    const {
      mobileNumber,
      email,
      username,
    } = this.state;

    const body = {
      username: username.trim(),
      phone: mobileNumber.trim(),
      email: email.trim(),
    };


    if (checkStatus) {
      this.setState({ loading: true, submit: true });
      verification(body, () => history.push('/account-activation'))
        .then(() => this.setState(initialState))
        .catch(() => this.setState(initialState));
    }
  }


  render() {
    const {
      username, email, mobileNumber,
      loading, activationMethod, submit,
      errors, usernameSet, noErrors,
    } = this.state;

    const {
      location,
      errorObj,
      errorMessage,
      successMessage,
    } = this.props;

    const usernameError = errorObj.username
      ? errorObj.username[0] : '';

    const emailError = errorObj.email
      ? errorObj.email[0] : '';

    const phoneError = errorObj.phone
      ? errorObj.phone[0] : '';


    return (
      <Form
        title={!successMessage && 'Let\'s get you started!'}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >
        {!submit && !successMessage && (
          <Input
            placeholder="Enter your username"
            name="username"
            value={username}
            error={errors.username || usernameError}
            onKey={this.processUsername}
            handleChange={this.handleChange}
            icon="fa fa-user"
          />
        )}

        {usernameSet && !submit && (
          <Button
            value="Verification via SMS"
            styleName="sms-button"
            onClick={this.usingSMS}
          />
        )}

        {usernameSet && !submit && (
          <Button
            value="Verification via Email"
            styleName="email-button"
            onClick={this.usingEmail}
          />
        )}

        {activationMethod === 'sms' && !submit && (
          <Phone
            placeholder=" Enter your mobile number"
            name="mobileNumber"
            value={mobileNumber}
            location={location}
            error={errors.mobileNumber || phoneError[0]}
            onKey={this.processMobile}
            handleChange={this.handleChange}
          />
        )}

        {activationMethod === 'email' && !submit && (
          <Input
            placeholder="Enter your email address"
            name="email"
            type="email"
            value={email}
            error={errors.email || emailError[0]}
            onKey={this.processEmail}
            handleChange={this.handleChange}
            icon="fa fa-envelope"
          />
        )}

        {(!username)
        && (
          <div className="kt-login__extra float-right">
            <Link
              to="/login"
              id="kt_login_forgot"
              style={{
                color: '#000',
                fontWeight: '700',
              }}
            >Login Now ?
            </Link>
          </div>
        )}


        {(activationMethod || submit) && (
          <Button
            value={loading ? ' Loading . . .' : 'Sign Up'}
            disabled={((activationMethod === 'sms' && !mobileNumber)
            || (activationMethod === 'email' && !email))
            || !username || !noErrors}
            loading={loading}
          />
        )}

      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.location.location,
    errorMessage: state.auth.errorMessage,
    errorObj: state.auth.errors,
    successMessage: state.auth.successMessage,
  };
}


export default connect(mapStateToProps,
  {
    locationInfo,
    signup,
    clearMessage,
  })(Signup);
