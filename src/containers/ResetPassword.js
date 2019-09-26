import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  validatePassword, validatePasswordConfirmation,
} from '../libs/validations';
import { resetPassword, clearMessage, findResetToken } from '../actions/authActions';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';


const initialState = {
  password: '',
  passwordConfirmation: '',
  errors: {
    password: '',
    passwordConfirmation: '',
  },
  loading: false,
};


class ResetPassword extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: clear,
      findResetToken: find, token,
    } = this.props;

    find(token);

    clear();
    document.title = 'Sedmic - Reset Password';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
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

    const { password, passwordConfirmation } = this.state;

    const validation = validatePasswordConfirmation(password.trim(),
      passwordConfirmation.trim());

    const { message, status } = validation;
    this.setState({ errors: { passwordConfirmation: message } });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      resetPassword: reset, token,
      clearMessage: clear,
    } = this.props;

    clear();

    const { password, passwordConfirmation } = this.state;

    let checkStatus = true;

    if (checkStatus) {
      const { status } = this.processPassword();
      checkStatus = status;
    }


    if (checkStatus) {
      const { status } = this.processPasswordConfirmation();
      checkStatus = status;
    }


    const body = {
      password: password.trim(),
      password_confirmation: passwordConfirmation.trim(),
    };

    if (checkStatus) {
      this.setState({ loading: true });
      reset(body, token)
        .then(() => this.setState(initialState))
        .then(() => this.setState({ loading: false }));
    }
  }


  render() {
    const {
      successMessage,
      errorMessage,
    } = this.props;

    const {
      errors, password,
      passwordConfirmation,
      loading,
    } = this.state;


    return (
      <Form
        title={(!successMessage && !errorMessage) && 'Reset Password'}
        subTitle={(!successMessage && !errorMessage) && 'Please enter your new password twice'}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >

        {(!successMessage && !errorMessage) && (
          <Input
            placeholder="Enter your new password"
            name="password"
            type="password"
            value={password}
            error={errors.password}
            onKey={this.processPassword}
            handleChange={this.handleChange}
            icon="fa fa-lock"
          />
        )}

        {(!successMessage && !errorMessage) && (
          <Input
            placeholder="Enter password confirmation"
            name="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            error={errors.passwordConfirmation}
            onKey={this.processPasswordConfirmation}
            handleChange={this.handleChange}
            icon="fa fa-lock"
          />
        )}

        <Button
          value={loading ? '  Loading . . .' : 'Reset Password'}
          disabled={!password || !passwordConfirmation}
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
  };
}

export default connect(mapStateToProps,
  {
    clearMessage,
    resetPassword,
    findResetToken,
  })(ResetPassword);
