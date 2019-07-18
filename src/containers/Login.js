import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearMessage, loginUser } from '../actions/authActions';
import { validateFullName, validatePassword } from '../libs/validations';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';


const initialState = {
  username: '',
  password: '',
  errors: {
    email: '',
    password: '',
  },
  isLoading: false,
};

class Login extends Component {
  state = initialState;


  componentDidMount = () => {
    const {
      clearMessage: message,
    } = this.props;

    message();
    document.title = 'Sedmic - Login';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processUsername = () => {
    const { username } = this.state;
    const { clearMessage: clear } = this.props;

    clear();

    const validation = validateFullName(username.trim(), 'username');
    const { message, status } = validation;
    this.setState({ errors: { username: message } });

    return { status };
  }

  processPassword = () => {
    const { password } = this.state;
    const { clearMessage: clear } = this.props;

    clear();

    const validation = validatePassword(password.trim(), false);
    const { message, status } = validation;
    this.setState({ errors: { password: message } });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      loginUser: login, history,
      clearMessage: clear,
    } = this.props;

    clear();

    const { username, password } = this.state;

    let checkStatus = true;

    if (checkStatus) {
      const { status } = this.processUsername();
      checkStatus = status;
    }

    if (checkStatus) {
      const { status } = this.processPassword();
      checkStatus = status;
    }


    const body = {
      username: username.trim(),
      password: password.trim(),
    };

    if (checkStatus) {
      this.setState({ isLoading: true });
      login(body, () => history.push('/home'))
        .then(() => {
          this.setState(initialState);
        })
        .then(() => this.setState({ isLoading: false }));
    }
  }


  render() {
    const { successMessage, errorMessage } = this.props;

    const {
      errors, username, password, isLoading,
    } = this.state;


    return (
      <Form
        title="Login Now"
        subTitle="Please enter your username and password"
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
        successMessage={successMessage}

      >
        <Input
          placeholder="Enter your username"
          name="username"
          value={username}
          error={errors.username}
          onKey={this.processUsername}
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

        <div className="kt-login__extra">
          <label className="kt-checkbox" style={{ color: '#000', fontWeight: '700' }}>
            <input type="checkbox" name="remember" /> Remember me
            <span />
          </label>

          <Link
            to="/forgot-password"
            id="kt_login_forgot"
            style={{ color: '#000', fontWeight: '700' }}
          >Forget Password ?
          </Link>

        </div>

        <Button
          value={isLoading ? 'Loading . . .' : 'Login'}
          disabled={isLoading}
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

    clearMessage, loginUser,
  })(Login);
