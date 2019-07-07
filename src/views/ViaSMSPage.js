import React from 'react';
import Auth from '../components/Layout/Auth';
import ViaSMS from '../containers/ViaSMS';


export default (props) => (
  <Auth>
    <ViaSMS {...props} />
  </Auth>
);
