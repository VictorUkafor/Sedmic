import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, clearMessage, clearUsername } from '../actions/authActions';
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
      clearMessage: message, history,
      locationInfo: geoInfo, field, username,
    } = this.props;

    if (!username) {
      return history.push('/signup');
    }

    message();
    geoInfo();
    document.title = `Sedmic - Using ${field} for Verification`;
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processMobile = () => {
    const { mobileNumber } = this.state;
    const validation = validatePhone(mobileNumber.trim());
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  processEmail = () => {
    const { email } = this.state;
    const validation = validateEmail(email.trim());
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      signup: verification,
      clearUsername: usernameClear,
      field, username, history,
    } = this.props;

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
      verification(body).then((res) => {
        this.setState(initialState);
        usernameClear();
        if (body.phone) {
          return history.push('/account-activation');
        }
      }).catch((e) => {
        this.setState(initialState);
        usernameClear();
      });
    }
  }


  render() {
    const {
      field, location, successMessage,
      errorMessage, username,
    } = this.props;
    const {
      mobileNumber, email, error, isLoading,
    } = this.state;

    return (
      <Form
        title={username && `Step 2 - Using ${field} for Verification`}
        handleSubmit={this.handleSubmit}
        successMessage={successMessage}
        errorMessage={errorMessage}
      >
        {username && field === 'SMS'
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
      )
        }

        {username && field === 'Email'
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
      )
        }


        {username && (
          <Button
            value={isLoading ? 'Loading . . .' : 'Submit'}
            disabled={isLoading}
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
  };
}

export default connect(mapStateToProps,
  {
    locationInfo, signup, clearMessage, clearUsername,
  })(VerifyType);
