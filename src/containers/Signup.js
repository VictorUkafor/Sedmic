import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsernames, getUsername } from '../actions/authActions';
import { validateUsername } from '../libs/validations';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const initialState = {
  username: '', error: '',
};

class Signup extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      fetchUsernames: getUsernames,
    } = this.props;

    getUsernames();
    document.title = 'Sedmic - Let\'s Get You Started';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }


  processUsername = () => {
    const { username } = this.state;
    const { usernames } = this.props;

    const validation = validateUsername(username.trim(), usernames);
    const { message, status } = validation;
    this.setState({ error: message });

    return { username: username.trim(), status };
  }


  usingSMS = (event) => {
    event.preventDefault();

    const { getUsername: setUsername, history } = this.props;
    const { username, status } = this.processUsername();

    if (status) {
      setUsername(username, () => history.push('/account-verification-option/SMS'));
      this.setState(initialState);
    }
  }


  usingEmail = (event) => {
    event.preventDefault();

    const { getUsername: setUsername, history } = this.props;
    const { username, status } = this.processUsername();

    if (status) {
      setUsername(username.trim(),
        () => history.push('/account-verification-option/Email'));
      this.setState(initialState);
    }
  }


  render() {
    const { username, error } = this.state;

    return (
      <Form
        title="Let&apos;s get you started!"
        subTitle="To begin enter your username and click on your preferred verification option"
      >
        <Input
          placeholder="Enter your username"
          name="username"
          value={username}
          error={error}
          onKey={this.processUsername}
          handleChange={this.handleChange}
        />
        <Button
          value="Verification via SMS"
          styleName="normal-button-2 sms-button"
          onClick={this.usingSMS}
        />
        <Button
          value="Verification via Email"
          styleName="normal-button-2 email-button"
          onClick={this.usingEmail}
        />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    usernames: state.auth.checks,
  };
}


export default connect(mapStateToProps, { fetchUsernames, getUsername })(Signup);
