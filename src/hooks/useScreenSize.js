import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default () => {
  const [ windowWidth, setWindowWidth ] = useState(Dimensions.get('window').width);
  const [ windowHeight, setWindowHeight ] = useState(Dimensions.get('window').height);
  const [ screenWidth, setScreenWidth ] = useState(Dimensions.get('screen').width);
  const [ screenHeight, setScreenHeight ] = useState(Dimensions.get('screen').height);

  useEffect(() => {

    // change handler
    const handleSizeChange = ({ window, screen }) => {
      setWindowWidth(window.width);
      setWindowHeight(window.height);
      setScreenWidth(screen.width);
      setScreenHeight(screen.height);
    }
    
    // add listener for screen size changes
    Dimensions.addEventListener('change', handleSizeChange);

    // on unmount, remove change listener
    return () => {
      Dimensions.removeEventListener('change', handleSizeChange);
    }

  }, []);

  return {
    windowWidth,
    windowHeight,
    screenWidth,
    screenHeight,
  };
}