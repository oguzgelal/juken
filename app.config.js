import ENV from './env.json';

export const VERSION = '4';
export const IOS_VERSION = '4';
export const ANDROID_VERSION = 9;

export default {
  name: "Juken",
  slug: "juken",
  privacy: "public",
  userInterfaceStyle: "automatic",
  platforms: [
    "ios",
    "android",
    "web"
  ],
  version: VERSION,
  orientation: "portrait",
  icon: "./assets/wk4.png",
  splash: {
    image: "./assets/wksplash4.png",
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
    bundleIdentifier: ENV.BUNDLE_ID,
    buildNumber: IOS_VERSION,
    userInterfaceStyle: "automatic",
  },
  android: {
    package: ENV.PACKAGE,
    "versionCode": ANDROID_VERSION,
    permissions: [
      "VIBRATE"
    ],
    userInterfaceStyle: "automatic",
  }
}