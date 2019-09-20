import React, { Component } from 'react';

export default (ChildComponent) => {
  class AuthComplete extends Component {
    componentDidMount() {
      this.checkComplete();
    }

    componentDidUpdate() {
      this.checkComplete();
    }


    checkComplete() {
      const { history } = this.props;

      const token = localStorage.getItem('activation_token');

      if (!token) {
        history.push('/account-verification-option/Email');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }


  return AuthComplete;
};
