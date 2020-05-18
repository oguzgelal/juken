export const VERSION = '1.0.0';

export default {
  name: "Juken",
  slug: "juken",
  privacy: "public",
  platforms: [
    "ios",
    "android",
    "web"
  ],
  version: VERSION,
  orientation: "portrait",
  icon: "./assets/wk4.png",
  splash: {
    image: "./assets/wksplash3.png",
    resizeMode: "contain",
    backgroundColor: "#1ecbe1"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    icon: "./assets/wk4sq.png",
    supportsTablet: true,
    bundleIdentifier: process.env.BUNDLE_ID,
    googleServicesFile: "./GoogleService-Info.plist",
    buildNumber: VERSION,
  },
  android: {
    package: process.env.PACKAGE,
    googleServicesFile: "./google-services.json",
    "versionCode": 2,
    permissions: [
      "VIBRATE"
    ]
  },
  web: {
    config: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      } 
    }
  }
}