import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';
import Loading from 'src/screens/Loading';

import storage, { useListener, useStoredValue } from 'src/models/storage';
import { WK_API_KEY } from 'src/common/constants';

export default function App() {

  const [ apiKey, _, fetchApiKey ] = useStoredValue(WK_API_KEY);

  return (
    <>
      {fetchApiKey && <Loading />}
      {!fetchApiKey && !apiKey && <Review />}
      {!fetchApiKey && apiKey && <Login />}
    </>
  )
}
