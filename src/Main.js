import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import _ from 'lodash';
import { initializeApp, apps } from 'firebase/app';
import * as Analytics from 'expo-firebase-analytics';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
import setUserAnalytics from 'src/utils/setUserAnalytics';
import device from 'src/utils/device';
import { VERSION } from 'src/../app.config'
export default () => {

  const apiKey = select(r => r.API_KEY);
  const user = select(r => r.USER);

  const [ demo, setDemo ] = useState(false);

  useEffect(() => {
    if (device('web') && !apps.length) {
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
    
    const logargs = {
      user: _.get(user, 'data.username'),
      version: VERSION,
      os: Platform.OS,
      osversion: Platform.Version,
      isIpad: Platform.isPad,
      isTv: Platform.isTV,
      isTvOs: Platform.isTVOS,
    };

    if (user) {
      setUserAnalytics(user, () => {
        Analytics.logEvent('wanianki_Load', logargs)
      });
    } else {
      Analytics.logEvent('wanianki_Load', logargs)
    }
    
  }, [])

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
