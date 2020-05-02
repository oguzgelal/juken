import React from 'react';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';
import Loading from 'src/screens/Loading';
import resource, { r } from 'src/models/resource';

export default () => {

  const [ apiKey, apiKeyLoading ] = resource.useResource(r.WK_API_KEY)();

  return (
    <>
      {apiKeyLoading && <Loading />}
      {!apiKeyLoading && apiKey && <Review />}
      {!apiKeyLoading && !apiKey && <Login />}
    </>
  )
};