import React from 'react';

const ForgotPassword = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Forgotten Password ?</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="email" placeholder="Enter your email to reset your password" name="email" id="kt_email" autoComplete="off" />
        </div>
        <div className="kt-login__actions">
          <button type="button" id="kt_login_forgot_submit" className="btn btn-brand btn-pill btn-elevate">Request</button>
          <button type="button" id="kt_login_forgot_cancel" className="btn btn-outline-brand btn-pill">Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

export default ForgotPassword;
