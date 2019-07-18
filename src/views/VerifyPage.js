import React from 'react';
import queryString from 'query-string';
import Auth from '../components/Layout/Auth';
import Verify from '../containers/Verify';


export default (props) => {
  const { location: { search } } = props;
  const params = queryString.parse(search);
  return (
    <Auth>
      <Verify token={params.token} {...props} />
    </Auth>
  );
};
