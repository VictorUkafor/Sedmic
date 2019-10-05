import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Authentication from './HOC/Authentication';
import AuthSignup from './HOC/AuthSignup';
import NotAuth from './HOC/NotAuth';
import Index from '../views/Index';
import LoginPage from '../views/LoginPage';
import SignupPage from '../views/SignupPage';
import ForgotPasswordPage from '../views/ForgotPasswordPage';
import ResetPasswordPage from '../views/ResetPasswordPage';
import CompleteSignupPage from '../views/CompleteSignupPage';
import ChurchRegistrationPage from '../views/ChurchRegistrationPage';
import HomePage from '../views/HomePage';
import Home from '../views/Home';
import '../styles/styles.css';

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={AuthSignup(SignupPage)} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/forgot-password" component={NotAuth(ForgotPasswordPage)} />
      <Route exact path="/reset-password/:token" component={NotAuth(ResetPasswordPage)} />
      <Route exact path="/account-activation" component={CompleteSignupPage} />
      <Route exact path="/church-registration" component={Authentication(ChurchRegistrationPage)} />
      <Route exact path="/home" component={Authentication(HomePage)} />
    </div>
  </BrowserRouter>
);
