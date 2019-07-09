import React from 'react';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const Login = () => (
  <Form
    title="Login"
  >
    <Input
      placeholder="Enter your email address"
      name="email"
      type="email"
    />
    <Input
      placeholder="Enter your password"
      name="password"
      type="password"
    />
    <div className="kt-login__extra">
      <label className="kt-checkbox">
        <input type="checkbox" name="remember" /> Remember me
        <span />
      </label>
      <p href="#" id="kt_login_forgot">Forget Password ?</p>
    </div>
    <Button
      value="Login"
    />
  </Form>
);

export default Login;
