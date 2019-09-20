import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMessage, logOut } from '../actions/authActions';
import { getProfile } from '../actions/churchActions';
import Button from '../components/Field/Button';


class Home extends Component {
  state = { name: '' }


  componentDidMount = () => {
    const {
      getProfile: profile,
      clearMessage: message,
      user, history, auth,
    } = this.props;

    console.log('loggggggggg', localStorage.getItem('auth'));
    //message();
  }

  logout = (event) => {
    const { history, logOut: logout } = this.props;
    event.preventDefault();
    logout().then(()=> history.push('/login'));
  }


  render() {
    return (
      <Button
        value="Logout"
        styleName="email-button"
        onClick={this.logout}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user.user,
    auth: state.user.auth,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
  };
}

export default connect(mapStateToProps,
  {
    clearMessage, getProfile, logOut,
  })(Home);
