import React from 'react';
import Auth from '../components/Layout/Auth';
import VerifyType from '../containers/VerifyType';


export default (props) => {
  const { match: { params: { field } } } = props;

  return (
    <Auth>
      <VerifyType field={field} {...props} />
    </Auth>
  );
};
