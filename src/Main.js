import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';

import storage, { useListener, useStoredValue } from 'src/models/storage';
import { WK_API_KEY } from 'src/common/constants';

export default function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  const [ test, setTest, fetchingTest ] = useStoredValue('test');

  useEffect(() => {
    setTimeout(() => {
      setTest('yoo...').then(newVal => {
        console.log('job done', newVal);
      })
    }, 3000)
  }, [])

  useEffect(() => {
    if (!fetchingTest) {
      console.log('test updated', test);
    }
  }, [test])

  useListener('test', newTest => {
    console.log('hello from the listener', newTest);
  })

  useEffect(() => {
    window.storage = storage;
    storage
      .get(WK_API_KEY)
      .then(apiKey => {
        if (apiKey) setLoggedIn(true);
      })
  }, []);

  return <Text>{fetchingTest ? 'loading...' : test}</Text>;
  // if (loggedIn) return <Review />;
  // return <Login />;
}
