import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class Authentication extends Component {
    componentDidMount() {
      this.checkAuthStatus();
    }

    componentDidUpdate() {
      this.checkAuthStatus();
    }

    checkAuthStatus() {
      const { auth, history } = this.props;
      if (!auth) {
        history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.auth };
  }

  return connect(mapStateToProps)(Authentication);
};
