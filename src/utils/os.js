import { Platform } from 'react-native';

// native desktop OS apps
const isDesktopNative = () => {
  return (
    Platform.OS === 'macos' ||
    Platform.OS === 'windows'
  )
}

// desktop environments
const isDesktop = () => {
  return (
    Platform.OS === 'web' ||
    isDesktopNative()
  );
}

// native mobile environments
const isMobileNative = () => {
  return (
    Platform.OS === 'ios' ||
    Platform.OS === 'android'
  );
}

// all mobile environments including mobile web
// TODO: detect mobile web browser
const isMobile = () => {
  return (
    isMobileNative()
  );
}

export default query => {
  switch (query) {
    case 'desktopNative': return isDesktopNative();
    case 'desktop': return isDesktop();
    case 'mobileNative': return isMobileNative();
    case 'mobile': return isMobile();
    
    // fall back to Platform.OS variables
    default: return Platform.OS === query;
  }
}