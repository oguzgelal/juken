import ENV from './env.json';

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
  version: `${ENV.BUILD_VERSION}`,
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
    buildNumber: `${ENV.BUILD_VERSION}`,
    userInterfaceStyle: "automatic",
  },
  android: {
    package: ENV.PACKAGE,
    "versionCode": ENV.BUILD_VERSION,
    permissions: [
      "VIBRATE"
    ],
    userInterfaceStyle: "automatic",
  }
}