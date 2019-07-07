import React from 'react';
import Auth from '../components/Layout/Auth';
import ResetPassword from '../containers/ResetPassword';


export default (props) => (
  <Auth>
    <ResetPassword {...props} />
  </Auth>
);
