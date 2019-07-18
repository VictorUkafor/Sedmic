import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMessage } from '../actions/authActions';
import { createChurch } from '../actions/churchActions';
import {
  validatePhone, validateEmail,
  validateFullName, validateUsername2,
} from '../libs/validations';
import { locationInfo } from '../actions/locationActions';
import Input from '../components/Field/Input';
import Phone from '../components/Field/Phone';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';


const initialState = {
  churchName: '',
  churchNumber: '',
  churchEmail: '',
  username: '',
  venue: '',
  minister: '',
  errors: {
    churchName: '',
    churchNumber: '',
    churchEmail: '',
    username: '',
    venue: '',
    minister: '',
  },
  isLoading: false,
};

class ChurchRegistration extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: message, history,
      locationInfo: geoInfo, isSignup,
    } = this.props;

    if (!isSignup) {
      history.push('/account-activation');
    }

    message();
    geoInfo();
    document.title = 'Sedmic - Church Registration';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processName = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { churchName } = this.state;
    const validation = validateFullName(churchName.trim(), 'church name');
    const { message, status } = validation;
    this.setState({ errors: { churchName: message } });

    return { status };
  }

  processUsername = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { username } = this.state;
    const validation = validateUsername2(username.trim(), 11);
    const { message, status } = validation;
    this.setState({ errors: { username: message } });

    return { status };
  }


  processEmail = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { churchEmail } = this.state;
    const validation = validateEmail(churchEmail.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { churchEmail: message } });

    return { status };
  }


  processMinister = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { minister } = this.state;
    const validation = validateFullName(minister.trim(), 'church minister\' name');
    const { message, status } = validation;
    this.setState({ errors: { minister: message } });

    return { status };
  }


  processNumber = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { churchNumber } = this.state;
    const validation = validatePhone(churchNumber.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { churchNumber: message } });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      history, createChurch: church,
      clearMessage: clear,
    } = this.props;

    clear();

    const {
      churchName, churchNumber, churchEmail,
      username, venue, minister,
    } = this.state;

    let checkStatus = true;

    if (checkStatus) {
      const { status } = this.processName();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processNumber();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processEmail();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processUsername();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processMinister();
      checkStatus = status;
    }

    const body = {
      name_of_church: churchName.trim(),
      official_email: churchEmail.trim(),
      minister_in_charge: minister.trim(),
      sms_sender_name: username.trim(),
      contact_numbers: churchNumber.trim(),
      venue: venue.trim(),
    };


    if (checkStatus) {
      this.setState({ isLoading: true });
      church(body, () => history.push('/home'))
        .then(() => {
          this.setState(initialState);
        }).then(() => {
          this.setState(initialState);
        });
    }
  }


  render() {
    const {
      successMessage, errorMessage, location,
    } = this.props;

    const {
      errors, churchName, churchEmail, isLoading,
      churchNumber, venue, username, minister,
    } = this.state;


    return (
      <Form
        title="Final Step - Church Registration"
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >

        <Input
          placeholder="Enter your church name"
          name="churchName"
          value={churchName}
          error={errors.churchName}
          onKey={this.processName}
          handleChange={this.handleChange}
        />

        <Input
          placeholder="Enter the minister's name"
          name="minister"
          value={minister}
          error={errors.minister}
          onKey={this.processMinister}
          handleChange={this.handleChange}
        />


        <Input
          placeholder="Enter church username"
          name="username"
          value={username}
          error={errors.username}
          onKey={this.processUsername}
          handleChange={this.handleChange}
        />

        <Phone
          placeholder="Enter church number"
          name="churchNumber"
          value={churchNumber}
          location={location}
          error={errors.churchNumber}
          onKey={this.processNumber}
          handleChange={this.handleChange}
        />

        <Input
          placeholder=" Enter church email"
          name="churchEmail"
          value={churchEmail}
          error={errors.churchEmail}
          onKey={this.processEmail}
          handleChange={this.handleChange}
        />

        <Input
          placeholder="Enter church venue"
          name="venue"
          value={venue}
          error={errors.venue}
          handleChange={this.handleChange}
        />

        <Button
          value={isLoading ? 'Loading . . .' : 'Finish'}
          disabled={isLoading}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignup: state.auth.isSignup,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
    location: state.location.location,
  };
}

export default connect(mapStateToProps,
  { locationInfo, clearMessage, createChurch })(ChurchRegistration);
