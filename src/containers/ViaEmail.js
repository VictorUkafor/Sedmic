import React from 'react';

const ViaEmail = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Step 2 - Using Email for Verification!</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="email" placeholder="Enter your email address" name="email" autoComplete="off" />
        </div>

        <div className="kt-login__actions">
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate email-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default ViaEmail;
