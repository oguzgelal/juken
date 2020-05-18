import * as Analytics from 'expo-firebase-analytics';
import { VERSION, IOS_VERSION, ANDROID_VERSION } from 'src/../app.config'
import { Platform } from 'react-native';

export default (name, args = {}) => {
  Analytics.logEvent(name, {
    version: VERSION,
    iosAppVersion: IOS_VERSION,
    androidAppVersion: ANDROID_VERSION,
    os: Platform.OS,
    osVersion: Platform.Version,
    isIpad: Platform.isPad,
    ...args,
  })
}