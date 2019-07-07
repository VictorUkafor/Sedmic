import React from 'react';

const Login = () => (

  <div className="kt-login__signin">
    <div className="kt-login__head">
      <h3 className="kt-login__title">Login</h3>
    </div>
    <div className="kt-login__form">
      <form className="kt-form" action="#">
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Email" name="email" autoComplete="off" />
        </div>
        <div className="form-group">
          <input className="form-control form-control-last" type="password" placeholder="Password" name="password" />
        </div>
        <div className="kt-login__extra">
          <label className="kt-checkbox">
            <input type="checkbox" name="remember" /> Remember me
            <span />
          </label>
          <p href="#" id="kt_login_forgot">Forget Password ?</p>
        </div>
        <div className="kt-login__actions">
          <button type="button" id="kt_login_signin_submit" className="btn btn-brand btn-pill btn-elevate">Login</button>
        </div>
      </form>
    </div>
  </div>
);

export default Login;
