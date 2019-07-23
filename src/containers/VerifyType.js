import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, clearMessage } from '../actions/authActions';
import { validatePhone, validateEmail } from '../libs/validations';
import { locationInfo } from '../actions/locationActions';
import Input from '../components/Field/Input';
import Phone from '../components/Field/Phone';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const initialState = {
  mobileNumber: '',
  email: '',
  error: '',
  isLoading: false,
};

class VerifyType extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: clear,
      locationInfo: geoInfo,
      field,
    } = this.props;

    clear();
    geoInfo();

    document.title = `Sedmic - Using ${field} for Verification`;
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  switchToSMS = (event) => {
    event.preventDefault();
    const { clearMessage: clear } = this.props;

    clear();
    this.setState(initialState);

    const { history } = this.props;
    history.push('/account-verification-option/SMS');
  }


  switchToEmail = (event) => {
    event.preventDefault();
    const { clearMessage: clear } = this.props;

    clear();
    this.setState(initialState);

    const { history } = this.props;
    history.push('/account-verification-option/Email');
  }


  processMobile = () => {
    const { mobileNumber } = this.state;
    const { clearMessage: clear } = this.props;

    clear();

    const validation = validatePhone(mobileNumber.trim());
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  processEmail = () => {
    const { email } = this.state;
    const { clearMessage: clear } = this.props;

    clear();

    const validation = validateEmail(email.trim());
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      signup: verification,
      field, username, history,
      clearMessage: clear,
    } = this.props;

    clear();

    const { mobileNumber, email } = this.state;

    let checkStatus = true;
    if (field === 'SMS') {
      const { status } = this.processMobile();
      checkStatus = status;
    } else {
      const { status } = this.processEmail();
      checkStatus = status;
    }

    const body = {
      username: username.trim(),
      phone: mobileNumber.trim(),
      email: email.trim(),
      church_username: username.trim(),
    };


    if (checkStatus) {
      this.setState({ isLoading: true });
      verification(body, () => history.push('/account-verification'))
        .then(() => this.setState(initialState))
        .catch(() => this.setState({ isLoading: false }));
    }
  }


  render() {
    const {
      field, location, successMessage,
      errorMessage, username, tokenSent,
    } = this.props;
    const {
      mobileNumber, email, error, isLoading,
    } = this.state;

    const submit = field === 'SMS' ? 'Next' : 'Submit';

    return (
      <Form
        title={username && !tokenSent && !isLoading && `Step 2 - Using ${field} for Verification`}
        handleSubmit={this.handleSubmit}
        successMessage={!tokenSent ? successMessage : 'Check your email or phone for a verification link or code'}
        errorMessage={errorMessage}
      >
        {username && field === 'SMS' && !tokenSent && !isLoading
        && (
          <Phone
            placeholder=" Enter your mobile number"
            name="mobileNumber"
            value={mobileNumber}
            location={location}
            error={error}
            onKey={this.processMobile}
            handleChange={this.handleChange}
          />
        )}

        {username && field === 'Email' && !tokenSent && !isLoading
        && (
          <Input
            placeholder="Enter your email address"
            name="email"
            type="email"
            value={email}
            error={error}
            onKey={this.processEmail}
            handleChange={this.handleChange}
          />
        )}


        {username && !tokenSent && !isLoading && (
          <Button
            value={field === 'SMS' ? '<< Use Email Verification' : '<< Use SMS Verification'}
            styleName="back-button-2"
            onClick={field === 'SMS' ? this.switchToEmail : this.switchToSMS}
          />
        )}


        {username && !tokenSent && (
          <Button
            value={isLoading ? 'Loading . . .' : submit}
            disabled={isLoading}
            styleName="normal-button-2"
          />
        )}
      </Form>
    );
  }
}


function mapStateToProps(state) {
  return {
    username: state.auth.username,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
    location: state.location.location,
    tokenSent: state.auth.tokenSent,
    setCode: state.auth.setCode,
  };
}

export default connect(mapStateToProps,
  {
    locationInfo,
    signup,
    clearMessage,
  })(VerifyType);
