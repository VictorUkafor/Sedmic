import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  signupViaEmail, signupViaSMS, clearMessage,
  verifyToken,
} from '../actions/authActions';
import {
  validatePhone, validateEmail, validateFullName,
  validateDOB, validateGender, validateImage,
  validatePassword, validatePasswordConfirmation,
} from '../libs/validations';
import { locationInfo } from '../actions/locationActions';
import Input from '../components/Field/Input';
import Select from '../components/Field/Select';
import Phone from '../components/Field/Phone';
import Image from '../components/Field/Image';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';


const initialState = {
  fullName: '',
  mobileNumber: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  image: '',
  password: '',
  passwordConfirmation: '',
  errors: {
    fullName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    image: '',
    password: '',
    passwordConfirmation: '',
  },
  isLoading: false,
};

class CompleteSignup extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: message, history,
      locationInfo: geoInfo, verifyToken: verify,
      activationToken,
    } = this.props;


    if (!activationToken) {
      history.push('/account-verification-option/Email');
    }

    verify(activationToken, () => history.push('/account-activation'));

    message();
    geoInfo();
    document.title = 'Sedmic - Complete User Registration';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processFullName = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { fullName } = this.state;
    const validation = validateFullName(fullName.trim(), 'full name');
    const { message, status } = validation;
    this.setState({ errors: { fullName: message } });

    return { status };
  }

  processMobile = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { mobileNumber } = this.state;
    const validation = validatePhone(mobileNumber.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { mobileNumber: message } });

    return { status };
  }


  processEmail = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { email } = this.state;
    const validation = validateEmail(email.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { email: message } });

    return { status };
  }


  processDOB = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { dateOfBirth } = this.state;
    const validation = validateDOB(dateOfBirth.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { dateOfBirth: message } });

    return { status };
  }


  processGender = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { gender } = this.state;
    const validation = validateGender(gender.trim());
    const { message, status } = validation;
    this.setState({ errors: { gender: message } });

    return { status };
  }


  processImage = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { image } = this.state;
    const validation = validateImage(image.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { image: message } });

    return { status };
  }

  processPassword = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { password } = this.state;
    const validation = validatePassword(password.trim());
    const { message, status } = validation;
    this.setState({ errors: { password: message } });

    return { status };
  }

  processPasswordConfirmation = () => {
    const { clearMessage: clear } = this.props;

    clear();

    const { passwordConfirmation, password } = this.state;
    const validation = validatePasswordConfirmation(password.trim(),
      passwordConfirmation.trim());
    const { message, status } = validation;
    this.setState({ errors: { passwordConfirmation: message } });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      signupViaEmail: signupEmail,
      signupViaSMS: signupSMS,
      history, tokenUser,
      clearMessage: clear,
      activationToken,
    } = this.props;

    clear();

    const {
      fullName, email, mobileNumber,
      dateOfBirth, image, password, gender,
      passwordConfirmation, errors,
    } = this.state;

    let checkStatus = true;

    if (checkStatus) {
      const { status } = this.processFullName();
      checkStatus = status;
    }

    if (!tokenUser.phone && checkStatus) {
      const { status } = this.processMobile();
      checkStatus = status;
    }

    if (!tokenUser.email && checkStatus) {
      const { status } = this.processEmail();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processGender();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processDOB();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processImage();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processPassword();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processPasswordConfirmation();
      checkStatus = status;
    }

    let date = '';
    if (dateOfBirth.trim()) {
      const arr = dateOfBirth.split('/');
      date = `${arr[2]}:${arr[1]}:${arr[0]}`;
    }

    const body = {
      full_name: fullName.trim(),
      phone: mobileNumber.trim() || tokenUser.phone,
      email: email.trim() || tokenUser.email,
      image: '',
      sex: gender.trim(),
      verification_code: activationToken,
      date_of_birth: date,
      password: password.trim(),
      password_confirmation: passwordConfirmation.trim(),
    };

    if (checkStatus) {
      this.setState({ isLoading: true });

      if (tokenUser.email) {
        signupEmail(body, activationToken).then(() => {
          this.setState(initialState);

          if (tokenUser.account_type === 'diamond') {
            history.push('/church-registration');
          }

          if (tokenUser.account_type !== 'diamond') {
            history.push('/login');
          }
        }).then(() => this.setState({ isLoading: false }));
      }


      if (tokenUser.phone) {
        signupSMS(body).then(() => {
          this.setState(initialState);

          if (tokenUser.account_type === 'diamond') {
            history.push('/church-registration');
          }

          if (tokenUser.account_type !== 'diamond') {
            history.push('/login');
          }
        }).then(() => this.setState({ isLoading: false }));
      }
    }
  }


  render() {
    const {
      successMessage, errorMessage, location, tokenUser,
    } = this.props;

    const {
      errors, fullName, email, mobileNumber,
      dateOfBirth, image, password, gender,
      passwordConfirmation, isLoading,
    } = this.state;

    const step = tokenUser.phone ? 'Step 4' : 'Step 3';

    return (
      <Form
        title={`${step} - Complete User Registration`}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >

        <Input
          placeholder="Enter your full name"
          name="fullName"
          value={fullName}
          error={errors.fullName}
          onKey={this.processFullName}
          handleChange={this.handleChange}
        />

        { tokenUser.email && (
          <Phone
            placeholder=" Enter your mobile number"
            name="mobileNumber"
            value={mobileNumber}
            location={location}
            error={errors.mobileNumber}
            onKey={this.processMobile}
            handleChange={this.handleChange}
          />
        ) }

        {tokenUser.phone && (
          <Input
            placeholder=" Enter your email address"
            name="email"
            value={email}
            error={errors.email}
            onKey={this.processEmail}
            handleChange={this.handleChange}
          />
        )}

        <Select
          selectMessage="Choose your gender"
          name="gender"
          value={gender}
          error={errors.gender}
          onKey={this.processImage}
          handleChange={this.handleChange}
          options={['Female', 'Male']}
        />
        <Input
          placeholder="Enter your date of birth (format: 'dd-mm-yyyy')"
          name="dateOfBirth"
          value={dateOfBirth}
          error={errors.dateOfBirth}
          onKey={this.processDOB}
          handleChange={this.handleChange}
        />
        <Image
          imageMessage="Upload your photo"
          name="image"
          value={image}
          error={errors.image}
          onKey={this.processImage}
          handleChange={this.handleChange}
        />
        <Input
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          error={errors.password}
          onKey={this.processPassword}
          handleChange={this.handleChange}
        />
        <Input
          placeholder="Enter your password confirmation"
          name="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          error={errors.passwordConfirmation}
          onKey={this.processPasswordConfirmation}
          handleChange={this.handleChange}
        />
        <Button
          value={isLoading ? 'Loading . . .' : 'Complete Signup'}
          disabled={isLoading}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    activationToken: state.auth.activationToken,
    tokenUser: state.auth.tokenUser,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
    location: state.location.location,
  };
}

export default connect(mapStateToProps,
  {
    locationInfo,
    signupViaEmail,
    signupViaSMS,
    clearMessage,
    verifyToken,
  })(CompleteSignup);
