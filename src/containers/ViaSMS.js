import React from 'react';

const ViaSMS = () => (
  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Step 2 - Using SMS for Verification!</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <div className="input-group-prepend"><span className="input-group-text">234</span>
            <input className="form-control" type="text" placeholder="   Enter your mobile number" name="mobile_number" autoComplete="off" />
          </div>
        </div>

        <div className="kt-login__actions">
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate sms-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default ViaSMS;
