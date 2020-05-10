import merge from 'lodash/merge';
import { Platform } from 'react-native';
import { useMediaQuery } from 'react-responsive'

// desktop environments
const isWeb = () => {
  return (
    Platform.OS === 'web' ||
    Platform.OS === 'macos' ||
    Platform.OS === 'windows'
  );
}

// native mobile environments
const isMobile = () => {
  return (
    Platform.OS === 'ios' ||
    Platform.OS === 'android'
  );
}

// check custom platform
const isPlatform = query => {
  return Platform.OS === query;
}

export const media = () => ({
  desktop: useMediaQuery({ minWidth: 1100 }),
  tablet: useMediaQuery({ maxWidth: 1100 }),
  mobile: useMediaQuery({ maxWidth: 600 }),
})

export default query => {
  
  // query is an object, indicating stylesheet usage
  if (typeof query === 'object') {
    
    const {
      base = {},
      web = {},
      mobile = {},
      ios = {},
      android = {},
    } = query;

    if (isWeb()) return merge({}, base, web);
    if (isPlatform('ios')) return merge({}, base, mobile, ios);
    if (isPlatform('android')) return merge({}, base, mobile, android);
  }

  // query is a string, return the platform data
  switch (query) {
    case 'web': return isWeb();
    case 'mobile': return isMobile();
    default: return isPlatform(query);
  }
  
}