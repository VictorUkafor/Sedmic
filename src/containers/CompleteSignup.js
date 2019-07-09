import React from 'react';
import Input from '../components/Field/Input';
import Select from '../components/Field/Select';
import Phone from '../components/Field/Phone';
import Image from '../components/Field/Image';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

const CompleteSignup = (props) => {
  const { token } = props;

  return (
    <Form
      title="Step 3 - Complete User Registration"
    >

      {token ? ''
        : (
          <Input
            placeholder="Enter verification code"
            name="verification_code"
          />
        )}
      <Input
        placeholder="Enter your full name"
        name="full_name"
      />

      { token ? (
        <Phone
          placeholder=" Enter your mobile number"
          name="mobile_number"
        />
      ) : (
        <Input
          placeholder="Enter your email address"
          name="email"
          type="email"
        />
      )}

      <Select
        selectMessage="Choose your gender"
        name="gender"
        options={['Female', 'Male']}
      />
      <Input
        placeholder="Enter your date of birth (format: 'yyyy-mm-dd')"
        name="date_of_birth"
      />
      <Image
        imageMessage="Upload your photo"
        name="image"
      />
      <Input
        placeholder="Enter your password"
        name="password"
        type="password"
      />
      <Input
        placeholder="Enter password confirmation"
        name="password_confirmation"
        type="password"
      />
      <Button
        value="Submit"
      />
    </Form>
  );
};

export default CompleteSignup;
