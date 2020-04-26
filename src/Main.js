import React, { useState, useEffect } from 'react';

import Review from 'src/screens/Review';
import Login from 'src/screens/Login';

import storage from 'src/models/storage';
import { WK_API_KEY } from 'src/common/constants';

export default function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    window.storage = storage;
    storage
      .get(WK_API_KEY)
      .then(apiKey => {
        if (apiKey) setLoggedIn(true);
      })
  }, []);

  if (loggedIn) return <Review />;
  return <Login />;
}
