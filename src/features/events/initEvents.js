import { initializeApp, apps } from 'firebase/app';
import * as Analytics from 'expo-firebase-analytics';
import device from 'src/utils/device';

export default () => {
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
}