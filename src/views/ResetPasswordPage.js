import React from 'react';
import Auth from '../components/Layout/Auth';
import ResetPassword from '../containers/ResetPassword';


export default (props) => {
  const { match: { params: { token } } } = props;

  return (
    <Auth>
      <ResetPassword token={token} {...props} />
    </Auth>
  );
};
