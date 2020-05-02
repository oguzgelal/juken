import React, { useEffect } from 'react';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';
import Loading from 'src/screens/Loading';

import * as rs from 'src/common/resources';
import resource from 'src/models/resource';

export default function App() {

  // TODO
  // const [ apiKey, fetchingApiKey ] = resource.useCache(rs.WK_API_KEY);

  return (
    <>
      {fetchingApiKey && <Loading />}
      {!fetchingApiKey && apiKey && <Review />}
      {!fetchingApiKey && !apiKey && <Login />}
    </>
  )
}
