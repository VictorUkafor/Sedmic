import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class NotAuth extends Component {
    componentDidMount() {
      this.checkNotAuth();
    }

    componentDidUpdate() {
      this.checkNotAuth();
    }

    componentWillUnmount() {
      this.checkNotAuth();
    }

    checkNotAuth() {
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

  return connect(mapStateToProps)(NotAuth);
};
