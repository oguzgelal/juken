import React from 'react';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';
import Loading from 'src/screens/Loading';
import resource, { r } from 'src/models/resource';
import usePromise from 'src/hooks/usePromise'

export default () => {

  const [ apiKey ] = resource.useCache(r.WK_API_KEY);
  const { loading: apiKeyLoading } = usePromise(() => resource.get(r.WK_API_KEY)(), {
      immediate: true
    });

  return (
    <>
      {apiKeyLoading && <Loading />}
      {!apiKeyLoading && apiKey && <Review />}
      {!apiKeyLoading && !apiKey && <Login />}
    </>
  )
};