import React from 'react';
import queryString from 'query-string';
import Auth from '../components/Layout/Auth';
import CompleteSignup from '../containers/CompleteSignup';


export default (props) => {
  const { location: { search } } = props;
  const params = queryString.parse(search);
  return (
    <Auth>
      <CompleteSignup token={params.token} {...props} />
    </Auth>
  );
};
