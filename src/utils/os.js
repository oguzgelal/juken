import { Platform } from 'react-native';

// desktop environments
const isDesktop = () => {
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

export default query => {
  switch (query) {
    case 'web': return isDesktop();
    case 'mobile': return isMobile();
    
    // fall back to Platform.OS variables
    default: return Platform.OS === query;
  }
}