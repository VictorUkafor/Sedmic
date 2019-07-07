import React from 'react';
import Auth from '../components/Layout/Auth';
import Signup from '../containers/Signup';


export default (props) => (
  <Auth>
    <Signup {...props} />
  </Auth>
);
