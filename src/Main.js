import React, { useState, useEffect } from 'react';
import { initializeApp, apps } from 'firebase/app';
import * as Analytics from 'expo-firebase-analytics';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
import setUserAnalytics from 'src/utils/setUserAnalytics';
import { VERSION } from 'src/../app.config'

export default () => {

  const apiKey = select(r => r.API_KEY);
  const user = select(r => r.USER);

  const [ demo, setDemo ] = useState(false);

  useEffect(() => {
    // TODO: do we need this ?
    if (!apps.length) {
      initializeApp({
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
    
    if (user) {
      setUserAnalytics(user, () => {
        Analytics.logEvent('wanianki_Load', {
          user,
          version: VERSION,
        })
      });
    } else {
      Analytics.logEvent('wanianki_Load', {
        version: VERSION,
      })
    }
    
  }, [])

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
