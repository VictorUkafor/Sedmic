import React from 'react';
import Auth from '../components/Layout/Auth';
import Home from '../containers/Home';


export default (props) => (
  <Auth>
    <Home {...props} />
  </Auth>
);
