import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import * as Analytics from 'expo-firebase-analytics';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
import firebaseConfig from 'src/common/firebaseConfig';

export default () => {

  const apiKey = select(r => r.API_KEY);
  const [ demo, setDemo ] = useState(false);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    Analytics.setUnavailabilityLogging(false);
  }, [])

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
