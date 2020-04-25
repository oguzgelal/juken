import { useMemo, useCallback } from 'react';
import { Animated } from 'react-native';

export default ({ windowWidth, windowHeight, dragRange }) => {

  // create variable to store movement of the top card
  const movement = useMemo(() => new Animated.ValueXY(), []);

  // create interpolation function that returns values for deck
  // based on top cards movement horizontally or vertically
  const getMovementInterpolation = useCallback((axis = 'x', outputRange) => {
    const valMovement = axis === 'x' ? movement.x : movement.y;
    const valRange = axis === 'x' ? windowWidth : windowHeight;
    return valMovement.interpolate({
      outputRange,
      inputRange: [-valRange, 0, valRange],
      extrapolate: 'clamp',
    })
  }, [windowWidth, windowHeight])
  
  // percent-wise how far is the card close
  // to be cleared horizontally or vertically
  const getClearInterpolation = useCallback((axis = 'x', outputRange) => (
    movement.x.interpolate({
      outputRange,
      inputRange: [-dragRange[axis], 0, dragRange[axis]],
      extrapolate: 'clamp',
    })
  ), [dragRange]);

  return {
    movement,
    getMovementInterpolation,
    getClearInterpolation,
  }
}