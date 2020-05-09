import { useMemo, useState, useEffect } from 'react';
import { Animated, PanResponder } from 'react-native';

export default ({
  leaveScreenDuration,
  dragRange,
  friction,
  movement,
  topCard,
  offscreen,
  dismissCard,
}) => {

  // control swipe freeze
  const [ freezeSwipe, setFreezeSwipe ] = useState(false);

  // unfreeze swipe once the state change for the top card finishes
  useEffect(() => { setFreezeSwipe(false); }, [topCard]);

  // programmatically trigger a card swipe
  const triggerSwipeLeft = () => triggerSwipe('left');
  const triggerSwipeRight = () => triggerSwipe('right');
  const triggerSwipe = dir => {

    // freeze swipe within the duration
    // while the animation is running
    setFreezeSwipe(true);

    // animate card out
    Animated.timing(movement, {
      friction,
      duration: leaveScreenDuration,
      toValue: {
        y: offscreen.y,
        x: offscreen.x[dir],
      },
    }).start()

    // dismiss card and reset movement
    setTimeout(() => {
      dismissCard(dir);
      movement.setValue({ x: 0, y: 0 });
    }, leaveScreenDuration);
  }

  // initialize pan responder
  const panResponder = useMemo(() => {

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      // control how card moves while being dragged
      onPanResponderMove: (_, gestureState) => {
        movement.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },

      // control what happens when card is released
      onPanResponderRelease: (_, gestureState) => {

        // was the card dragged enough to the edges
        const clearLeft = gestureState.dx < -dragRange.x;
        const clearRight = gestureState.dx > dragRange.x;

        // card wasn moved enough to the sides,
        // animate it out and dismiss it
        if (clearLeft) triggerSwipeLeft();
        else if (clearRight) triggerSwipeRight();

        // card wasn't moved enough to the sides,
        // send it back to its original position
        else {
          Animated.spring(movement, {
            friction,
            toValue: { x: 0, y: 0 },
          }).start();
        }
      },
    });
  }, [
    topCard,
    movement,
    dragRange,
    offscreen,
  ]);

  return {
    freezeSwipe,
    triggerSwipeLeft,
    triggerSwipeRight,
    panResponder,
  }
}