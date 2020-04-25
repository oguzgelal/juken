import { useMemo } from 'react';
import { Animated, PanResponder } from 'react-native';

export default ({
  dragRange,
  friction,
  movement,
  topCard,
  offscreen,
  dismiss,
}) => {
  return useMemo(() => {
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

        // card wasn moved enough to the sides,
        // animate it out and dismiss it
        if (clear) {
          // animate card out
          Animated.spring(movement, {
            friction,
            toValue: {
              y: offscreen.y,
              x: clearLeft ? offscreen.x.left : offscreen.x.right,
            },
          }).start(() => {
            // dismiss the top card
            dismiss(topCard.id);
          })
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
    dragRange,
    movement,
    topCard,
    offscreen,
  ]);
}