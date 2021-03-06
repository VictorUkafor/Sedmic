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
  loading: false,
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
      this.setState({ loading: true });
      forgot(body)
        .then(() => {
          this.setState(initialState);
        })
        .then(() => this.setState({ loading: false }));
    }
  }


  render() {
    const {
      successMessage,
      errorMessage,
    } = this.props;

    const {
      error, username, loading,
    } = this.state;


    return (
      <Form
        title={!successMessage && 'Forgotten Password ?'}
        subTitle={!successMessage && 'Enter your username to request for password reset'}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}
      >
        {!successMessage && (
          <Input
            placeholder="Enter your username"
            name="username"
            value={username}
            error={error}
            onKey={this.processUsername}
            handleChange={this.handleChange}
            icon="fa fa-user"
          />
        )}

        <Button
          value={loading ? '  Loading . . .' : 'Send Request'}
          disabled={!username || error}
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
    clearMessage, forgotPassword,
  })(ForgotPassword);
