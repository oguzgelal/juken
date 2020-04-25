import { useMemo, useCallback } from 'react';
import { Animated } from 'react-native';

export default windowWidth => {

  // create variable to store movement of the top card
  const movement = useMemo(() => new Animated.ValueXY(), []);

  // create interpolation function that returns values
  // for deck based on top cards movement within x axis
  const getMovementAnimation = useCallback((currentVal, leftVal, rightVal) => {
    return movement.x.interpolate({
      inputRange: [-windowWidth, 0, windowWidth],
      outputRange: [leftVal, currentVal, rightVal || leftVal],
      extrapolate: "clamp",
    })
  }, [windowWidth])
  
  return {
    movement,
    getMovementAnimation,
  }
}