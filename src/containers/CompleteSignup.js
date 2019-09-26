import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  signupViaEmail, signupViaSMS, clearMessage,
  verifyToken, verifyCode,
} from '../actions/authActions';
import {
  validatePhone, validateEmail, validateFullName,
  validateDOB, validateGender, validateImage, validateCode,
  validatePassword, validatePasswordConfirmation,
} from '../libs/validations';
import { locationInfo } from '../actions/locationActions';
import Input from '../components/Field/Input';
import Select from '../components/Field/Select';
import Phone from '../components/Field/Phone';
import Image from '../components/Field/Image';
import Button from '../components/Field/Button';
import Code from '../components/Field/Code';
import Form from '../components/Field/Form';


const initialState = {
  fullName: '',
  mobileNumber: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  image: null,
  file: '',
  password: '',
  passwordConfirmation: '',
  verificationCode: '',
  errors: {
    fullName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    image: '',
    password: '',
    passwordConfirmation: '',
    verificationCode: '',
  },
  loading: false,
};

class CompleteSignup extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: clear,
      locationInfo: geoInfo,
    } = this.props;

    clear();

    geoInfo();
    document.title = 'Sedmic - Complete User Registration';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  handleFile = (event) => {
    this.setState({
      image: event.target.files ? event.target.files[0] : '',
      file: event.target.files ? event.target.files[0].name : '',
    });
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
    const { mobileNumber } = this.state;
    const { clearMessage: clear, userLocation } = this.props;
    const { country } = userLocation;
    clear();

    const digits = { NG: 11 };

    const validation = validatePhone(mobileNumber.trim(), true, digits[country]);
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

    const { file } = this.state;
    const validation = validateImage(file.trim());
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


  processCode = () => {
    const { verificationCode } = this.state;
    const { clearMessage: clear } = this.props;
    clear();

    const validation = validateCode(verificationCode.trim());
    const { message, status } = validation;
    this.setState({ errors: { verificationCode: message } });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      signupViaEmail: signupEmail,
      signupViaSMS: signupSMS, history,
      clearMessage: clear, location: { search },
    } = this.props;

    const { token } = queryString.parse(search);

    clear();

    const {
      fullName, email, mobileNumber,
      dateOfBirth, image, password, gender,
      passwordConfirmation, verificationCode,
    } = this.state;

    let checkStatus = true;

    if (checkStatus && !token) {
      const { status } = this.processCode();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processFullName();
      checkStatus = status;
    }

    if (token && checkStatus) {
      const { status } = this.processMobile();
      checkStatus = status;
    }

    if (!token && checkStatus) {
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
      date = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }


    const body = new FormData();
    body.append('full_name', fullName.trim());
    body.append('phone', mobileNumber.trim());
    body.append('email', email.trim());
    body.append('sex', gender.trim());
    body.append('image', image || '');
    body.append('date_of_birth', date);
    body.append('password', password.trim());
    body.append('password_confirmation', passwordConfirmation.trim());
    body.append('verification_code', verificationCode.trim());


    if (checkStatus && token) {
      this.setState({ loading: true });
      signupEmail(body, token, () => history.push('/home'))
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false }));
    }

    if (checkStatus && verificationCode) {
      this.setState({ loading: true });
      signupSMS(body, () => history.push('/home'))
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false }));
    }
  }


  render() {
    const {
      successMessage, errorMessage,
      userLocation, location: { search },
      errorObj,
    } = this.props;


    const codeError = errorObj.verification_code
      ? errorObj.verification_code[0] : '';

    const emailError = errorObj.email
      ? errorObj.email[0] : '';

    const phoneError = errorObj.phone
      ? errorObj.phone[0] : '';

    const fullNameError = errorObj.full_name
      ? errorObj.full_name[0] : '';

    const DOBError = errorObj.date_of_birth
      ? errorObj.date_of_birth[0] : '';

    const genderError = errorObj.gender
      ? errorObj.gender[0] : '';

    const imgError = errorObj.image
      ? errorObj.image[0] : '';

    const passwordError = errorObj.password
      ? errorObj.password[0] : '';

    const passwordConfError = errorObj.password_confirmation
      ? errorObj.password_confirmation[0] : '';

    const { token } = queryString.parse(search);

    const {
      errors, fullName, email, mobileNumber,
      dateOfBirth, password, gender,
      passwordConfirmation, loading,
      verificationCode,
    } = this.state;

    return (
      <Form
        title="Complete User Registration"
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >

        {!token && (
          <Code
            placeholder="Enter verification code"
            name="verificationCode"
            value={verificationCode}
            error={errors.verificationCode || codeError}
            onKey={this.processCode}
            handleChange={this.handleChange}
            icon="fa fa-lock"
          />
        )}

        <Input
          placeholder="Enter your full name"
          name="fullName"
          value={fullName}
          error={errors.fullName || fullNameError}
          onKey={this.processFullName}
          handleChange={this.handleChange}
          icon="fa fa-user"
        />

        { token && (
          <Phone
            placeholder="Enter your mobile number"
            name="mobileNumber"
            value={mobileNumber}
            location={userLocation}
            error={errors.mobileNumber || phoneError}
            onKey={this.processMobile}
            handleChange={this.handleChange}
          />
        ) }

        {!token && (
          <Input
            placeholder=" Enter your email address"
            name="email"
            value={email}
            error={errors.email || emailError}
            onKey={this.processEmail}
            handleChange={this.handleChange}
            icon="fa fa-envelope"
          />
        )}

        <Select
          selectMessage="Choose your gender"
          name="gender"
          value={gender}
          error={errors.gender || genderError}
          onKey={this.processImage}
          handleChange={this.handleChange}
          options={['Female', 'Male']}
          icon="fa fa-venus-mars"
        />
        <Input
          placeholder="Enter your date of birth (format: 'dd/mm/yyyy')"
          name="dateOfBirth"
          value={dateOfBirth}
          error={errors.dateOfBirth || DOBError}
          onKey={this.processDOB}
          handleChange={this.handleChange}
          icon="fa fa-table"
        />
        <Image
          imageMessage="Upload your photo"
          name="image"
          error={errors.image || imgError}
          handleChange={this.handleFile}
          icon="fa fa-venus-image"
        />
        <Input
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          error={errors.password || passwordError}
          onKey={this.processPassword}
          handleChange={this.handleChange}
          icon="fa fa-lock"
        />
        <Input
          placeholder="Enter your password confirmation"
          name="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          error={errors.passwordConfirmation || passwordConfError}
          onKey={this.processPasswordConfirmation}
          handleChange={this.handleChange}
          icon="fa fa-lock"
        />
        <Button
          value={loading ? '  Loading . . .' : 'Complete Signup'}
          disabled={!fullName || !dateOfBirth
          || !password || !passwordConfirmation || !gender
          || (token && !mobileNumber) || (!token && !email && !verificationCode)}
          loading={loading}
          styleName="normal-button-2"
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
    errorObj: state.auth.errors,
    userLocation: state.location.location,
  };
}

export default connect(mapStateToProps,
  {
    locationInfo,
    signupViaEmail,
    signupViaSMS,
    clearMessage,
    verifyToken,
    verifyCode,
  })(CompleteSignup);
