import React from 'react';
import Auth from '../components/Layout/Auth';
import Login from '../containers/Login';


export default (props) => (
  <Auth login="true">
    <Login {...props} />
  </Auth>
);
