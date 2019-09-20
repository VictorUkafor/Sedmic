import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class AuthSignupType extends Component {
    componentDidMount() {
      this.checkType();
    }

    componentDidUpdate() {
      this.checkType();
    }


    checkType() {
      const {
        username, tokenSent,
        setCode, history,
      } = this.props;

      if (!username) {
        history.push('/signup');
      }

      if (tokenSent && setCode) {
        history.push('/account-verification');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      username: state.auth.username,
      tokenSent: state.auth.tokenSent,
      setCode: state.auth.setCode,
    };
  }

  return connect(mapStateToProps)(AuthSignupType);
};
