import React from 'react';
import Auth from '../components/Layout/Auth';
import ViaEmail from '../containers/ViaEmail';


export default (props) => (
  <Auth>
    <ViaEmail {...props} />
  </Auth>
);
