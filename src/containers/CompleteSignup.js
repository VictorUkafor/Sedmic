import React from 'react';

const CompleteSignup = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Step 3 - Complete User Registration</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Enter verification code" name="verification_code" autoComplete="off" />
        </div>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Enter your full_name" name="full_name" autoComplete="off" />
        </div>
        <div className="form-group">
          <input className="form-control" type="email" placeholder="Enter your email address" name="email" autoComplete="off" />
        </div>
        <div className="form-group">
          <div className="input-group-prepend"><span className="input-group-text">234</span>
            <input className="form-control" type="text" placeholder="   Enter your mobile number" name="mobile_number" autoComplete="off" />
          </div>
        </div>

        <div className="form-group">
          <input className="form-control" type="password" placeholder="Enter your password" name="password" autoComplete="off" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Enter password confirmation" name="password_confirmation" autoComplete="off" />
        </div>

        <div className="kt-login__actions">
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate email-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default CompleteSignup;
