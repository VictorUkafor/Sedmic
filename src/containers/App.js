import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Index from '../views/Index';
import LoginPage from '../views/LoginPage';
import SignupPage from '../views/SignupPage';
import ForgotPasswordPage from '../views/ForgotPasswordPage';
import ResetPasswordPage from '../views/ResetPasswordPage';
import VerificationTypePage from '../views/VerificationTypePage';
import CompleteSignupPage from '../views/CompleteSignupPage';
import '../styles/styles.css';

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Index} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/account-verification-option/:field" component={VerificationTypePage} />
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      <Route exact path="/reset-password" component={ResetPasswordPage} />
      <Route exact path="/account-activation" component={CompleteSignupPage} />
    </div>
  </BrowserRouter>
);
