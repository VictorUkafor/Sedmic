import React from 'react';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const ResetPassword = () => (
  <Form
    title="Reset Password"
  >
    <Input
      placeholder="Enter your new password"
      name="password"
      type="password"
    />
    <Input
      placeholder="Enter password confirmation"
      name="password_confirmation"
      type="password"
    />
    <Button
      value="Reset Password"
    />
  </Form>
);

export default ResetPassword;
