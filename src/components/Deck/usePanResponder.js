import { useMemo, useState, useEffect } from 'react';
import { Animated, PanResponder } from 'react-native';

export default ({
  dragRange,
  friction,
  movement,
  topCard,
  offscreen,
  dismiss,
}) => {

  // control swipe freeze
  const [ freezeSwipe, setFreezeSwipe ] = useState(false);

  // unfreeze swipe once the state change for the top card finishes
  useEffect(() => { setFreezeSwipe(false); }, [topCard]);

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
        const clearLeft = gestureState.dx < -dragRange;
        const clearRight = gestureState.dx > dragRange;
        const clear = clearLeft || clearRight;

        const leaveScreenDuration = 400;

        // card wasn moved enough to the sides,
        // animate it out and dismiss it
        if (clear) {

          // freeze swipe within the duration
          // while the animation is running
          setFreezeSwipe(true);

          // animate card out
          Animated.timing(movement, {
            friction,
            duration: leaveScreenDuration,
            toValue: {
              y: offscreen.y,
              x: clearLeft ? offscreen.x.left : offscreen.x.right,
            },
          }).start()

          setTimeout(() => {
            dismiss(topCard.id);
            movement.setValue({ x: 0, y: 0 });
          }, leaveScreenDuration)
        }

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
    panResponder,
    freezeSwipe,
  }
}