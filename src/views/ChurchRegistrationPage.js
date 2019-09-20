import React from 'react';
import Auth from '../components/Layout/Auth';
import ChurchRegistration from '../containers/ChurchRegistration';


export default (props) => (
  <Auth>
    <ChurchRegistration {...props} />
  </Auth>
);
