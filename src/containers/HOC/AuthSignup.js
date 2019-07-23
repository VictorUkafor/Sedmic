import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class AuthSignup extends Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      const { auth, history } = this.props;
      if (auth) {
        history.push('/home');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.auth,
    };
  }

  return connect(mapStateToProps)(AuthSignup);
};
