import React, { useEffect } from 'react';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';
import Loading from 'src/screens/Loading';

import { useStoredValue } from 'src/models/storage';
import { WK_API_KEY } from 'src/common/storageKeys';

export default function App() {

  const [ apiKey, fetchingApiKey ] = useStoredValue(WK_API_KEY);

  return (
    <>
      {fetchingApiKey && <Loading />}
      {!fetchingApiKey && apiKey && <Review />}
      {!fetchingApiKey && !apiKey && <Login />}
    </>
  )
}
