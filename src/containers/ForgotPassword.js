import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateUsername } from '../libs/validations';
import { forgotPassword, clearMessage } from '../actions/authActions';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';


const initialState = {
  username: '',
  error: '',
  isLoading: false,
};

class ForgotPassword extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: message,
    } = this.props;

    message();
    document.title = 'Sedmic - Forgot Password';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processUsername = () => {
    const { clearMessage: clear } = this.props;
    clear();
    const { username } = this.state;
    const validation = validateUsername(username.trim(), [], false);
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      forgotPassword: forgot,
      clearMessage: clear,
    } = this.props;

    clear();

    const { username } = this.state;

    const { status } = this.processUsername();

    const body = { username: username.trim() };

    if (status) {
      this.setState({ isLoading: true });
      forgot(body)
        .then(() => {
          this.setState(initialState);
        })
        .then(() => this.setState({ isLoading: false }));
    }
  }


  render() {
    const { successMessage, errorMessage, linkSent } = this.props;

    const {
      error, username, isLoading,
    } = this.state;


    return (
      <Form
        title={!linkSent && 'Forgotten Password ?'}
        subTitle={!linkSent && 'Enter your username to request for password reset'}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={!linkSent ? successMessage : 'Password reset link has been sent to your email'}
      >
        {!linkSent && (
          <Input
            placeholder="Enter your username"
            name="username"
            value={username}
            error={error}
            onKey={this.processUsername}
            handleChange={this.handleChange}
          />
        )}
        {!linkSent && (
          <Button
            value={isLoading ? 'Loading . . .' : 'Send Request'}
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
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
    linkSent: state.auth.linkSent,
  };
}

export default connect(mapStateToProps,
  {
    clearMessage, forgotPassword,
  })(ForgotPassword);
