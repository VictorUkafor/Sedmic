import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class AuthSignup extends Component {
    componentDidMount() {
      this.checkUsername();
    }

    componentDidUpdate() {
      this.checkUsername();
    }

    checkUsername() {
      const { username, auth, history } = this.props;
      if (auth) {
        history.push('/home');
      }

      if (username) {
        history.push('/account-verification-option/Email');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      username: state.auth.username,
      auth: state.auth.auth,
    };
  }

  return connect(mapStateToProps)(AuthSignup);
};
