import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import * as Analytics from 'expo-firebase-analytics';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
// import { VERSION } from 'src/../app.config'

export default () => {

  const apiKey = select(r => r.API_KEY);
  const [ demo, setDemo ] = useState(false);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      });
    }
    Analytics.setUnavailabilityLogging(false);
  }, [])

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
