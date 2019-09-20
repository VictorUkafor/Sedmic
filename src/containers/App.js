import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Authentication from './HOC/Authentication';
import AuthSignup from './HOC/AuthSignup';
import AuthSignType from './HOC/AuthSignType';
import AuthSignVerify from './HOC/AuthSignVerify';
import AuthComplete from './HOC/AuthComplete';
import NotAuth from './HOC/NotAuth';
import Index from '../views/Index';
import LoginPage from '../views/LoginPage';
import SignupPage from '../views/SignupPage';
import VerifyPage from '../views/VerifyPage';
import ForgotPasswordPage from '../views/ForgotPasswordPage';
import ResetPasswordPage from '../views/ResetPasswordPage';
import VerificationTypePage from '../views/VerificationTypePage';
import CompleteSignupPage from '../views/CompleteSignupPage';
import ChurchRegistrationPage from '../views/ChurchRegistrationPage';
import HomePage from '../views/HomePage';
import '../styles/styles.css';

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Index} />
      <Route exact path="/signup" component={AuthSignup(SignupPage)} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/account-verification-option/:field" component={AuthSignType(VerificationTypePage)} />
      <Route exact path="/forgot-password" component={NotAuth(ForgotPasswordPage)} />
      <Route exact path="/reset-password/:token" component={NotAuth(ResetPasswordPage)} />
      <Route exact path="/account-verification" component={AuthSignVerify(VerifyPage)} />
      <Route exact path="/account-activation" component={AuthComplete(CompleteSignupPage)} />
      <Route exact path="/church-registration" component={Authentication(ChurchRegistrationPage)} />
      <Route exact path="/home" component={Authentication(HomePage)} />
    </div>
  </BrowserRouter>
);
