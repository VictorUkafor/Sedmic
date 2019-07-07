import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Index from '../views/Index';
import LoginPage from '../views/LoginPage';
import SignupPage from '../views/SignupPage';
import ForgotPasswordPage from '../views/ForgotPasswordPage';
import ResetPasswordPage from '../views/ResetPasswordPage';
import ViaEmailPage from '../views/ViaEmailPage';
import ViaSMSPage from '../views/ViaSMSPage';
import CompleteSignupPage from '../views/CompleteSignupPage';
import '../styles/styles.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Index} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/verify-by-email" component={ViaEmailPage} />
      <Route exact path="/verify-by-sms" component={ViaSMSPage} />
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      <Route exact path="/reset-password" component={ResetPasswordPage} />
      <Route exact path="/complete-user-registration" component={CompleteSignupPage} />
    </div>
  </BrowserRouter>
);

export default App;
