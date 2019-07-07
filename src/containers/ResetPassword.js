import React from 'react';

const ResetPassword = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Reset Password</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Enter your new password" name="password" id="kt_email" autoComplete="off" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Confirm your new password" name="password_confirmation" id="kt_email" autoComplete="off" />
        </div>
        <div className="kt-login__actions">
          <button type="button" id="kt_login_forgot_submit" className="btn btn-brand btn-pill btn-elevate">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
);

export default ResetPassword;
