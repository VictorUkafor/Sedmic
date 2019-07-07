import React from 'react';
import Auth from '../components/Layout/Auth';
import ForgotPassword from '../containers/ForgotPassword';


export default (props) => (
  <Auth>
    <ForgotPassword {...props} />
  </Auth>
);
