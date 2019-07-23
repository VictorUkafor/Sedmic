import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { verifyToken } from '../../actions/authActions';


export default (ChildComponent) => {
  class AuthSignVerify extends Component {
    componentDidMount() {
      this.checkType();
    }

    componentDidUpdate() {
      this.checkType();
    }

    checkType() {
      const {
        tokenSent, verifyToken: verify,
        history, location: { search },
      } = this.props;

      const { token } = queryString.parse(search);

      if (!tokenSent) {
        history.push('/account-verification-option/Email');
      }

      if (token) {
        verify(token, () => history.push('/account-activation'));
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      tokenSent: state.auth.tokenSent,
    };
  }

  return connect(mapStateToProps, { verifyToken })(AuthSignVerify);
};
