import React from 'react';
import Input from '../components/Field/Input';
import Phone from '../components/Field/Phone';
import Button from '../components/Field/Button';
import Form from '../components/Field/Form';

export default (props) => {
  const { field } = props;
  if (field !== 'Email' && field !== 'SMS') {
    return null;
  }

  return (
    <Form
      title={`Step 2 - Using ${field} for Verification`}
    >
      {field === 'SMS'
      && (
        <Phone
          placeholder=" Enter your mobile number"
          name="mobile_number"
        />
      )
      }

      {field === 'Email'
      && (
        <Input
          placeholder="Enter your email address"
          name="email"
          type="email"
        />
      )
      }
      <Button
        value="Submit"
      />
    </Form>
  );
};
