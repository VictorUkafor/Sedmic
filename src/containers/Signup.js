import React from 'react';
import Input from '../components/Field/Input';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const Signup = () => (
  <Form
    title="Let&apos;s get you started!"
  >
    <Input
      placeholder="Enter your username"
      name="username"
    />
    <Button
      value="Verification via SMS"
      styleName="sms-button"
    />
    <Button
      value="Verification via Email"
      styleName="email-button"
    />
  </Form>
);

export default Signup;
