import * as Analytics from 'expo-firebase-analytics';
import { VERSION } from 'src/../app.config'
import { Platform } from 'react-native';

export default (name, args = {}) => {
  Analytics.logEvent(name, {
    version: VERSION,
    os: Platform.OS,
    osVersion: Platform.Version,
    isIpad: Platform.isPad,
    isTv: Platform.isTV,
    isTvOs: Platform.isTVOS,
    ...args,
  })
}