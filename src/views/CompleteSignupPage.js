import React from 'react';
import Auth from '../components/Layout/Auth';
import CompleteSignup from '../containers/CompleteSignup';


export default (props) => (
  <Auth>
    <CompleteSignup {...props} />
  </Auth>
);
