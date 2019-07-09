import React from 'react';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const ForgotPassword = () => (
  <Form
    title="Forgotten Password ?"
  >
    <Input
      placeholder="Enter your email to reset your password"
      name="email"
      type="email"
    />
    <Button
      value="Reset Password"
    />
  </Form>
);

export default ForgotPassword;
