import React from 'react';

const Signup = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Let&apos;s get you started!</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Enter your username" name="username" autoComplete="off" />
        </div>

        <div className="kt-login__actions">
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate sms-button">Verify by SMS</button>
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate email-button">Verify by Email</button>
        </div>
      </form>
    </div>
  </div>
);

export default Signup;
