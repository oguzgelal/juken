import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated, PanResponder } from "react-native";
import useScreenSize from "src/hooks/useScreenSize";
import os from "src/utils/os";
import sheet from "src/utils/sheet";
import theme from "src/common/theme";

const baseZIndex = 1;
const topGapRate = -32;
const scaleDecreaseRate = 0.1;
const opacityDecreaseRate = 0.3;
const frictionBack = 5;
const frictionLeave = 9;

const getTop = (i) => i * topGapRate;
const getOpacity = (i) => 1 - opacityDecreaseRate * i;
const getScale = (i) => 1 - scaleDecreaseRate * i;

const Deck = ({ style = {}, cards = [], dismiss }) => {
  // dynamic window size
  const { windowWidth, windowHeight } = useScreenSize();

  // deck size
  const [deckWidth, setDeckWidth] = useState(null);
  const [deckHeight, setDeckHeight] = useState(null);

  // off screen position of cards
  const [offScreenXLeft, setOffScreenXLeft] = useState(null);
  const [offScreenXRight, setOffScreenXRight] = useState(null);
  const [offScreenY, setOffScreenY] = useState(null);

  // calculate off screen positions of cards
  useEffect(() => {
    setOffScreenY(windowHeight / 2 - deckHeight / 2);
    setOffScreenXLeft(-windowWidth - deckWidth);
    setOffScreenXRight(windowWidth + deckWidth);
  }, [deckWidth, deckHeight, windowWidth, windowHeight]);

  // how far do you have to drag the cards
  // for them to be dismissed
  const dragRange = os("mobile") ? windowWidth / 3 : 180;

  // sort cards and pick the top one
  const [cardsFinal, topCard] = useMemo(() => {
    const final = Array.isArray(cards) ? cards : [];
    return [final, final[0] || null];
  }, [cards]);

  // create gesture position variable
  const movement = useMemo(() => new Animated.ValueXY(), []);

  // create and configure pan responder
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

        // card wasn moved enough to the sides,
        // animate it out and dismiss it
        if (clear) {
          // animate card out
          Animated.spring(movement, {
            friction: frictionLeave,
            // useNativeDriver: true,
            toValue: {
              y: offScreenY,
              x: clearLeft ? offScreenXLeft : offScreenXRight,
            },
          }).start(() => {
            // dismiss the top card
            dismiss(topCard.id)
          })
        }

        // card wasn't moved enough to the sides,
        // send it back to its original position
        else {
          Animated.spring(movement, {
            friction: frictionBack,
            toValue: { x: 0, y: 0 },
          }).start();
        }
      },
    });
  }, [offScreenY, offScreenXLeft, offScreenXRight]);

  return (
    <View
      style={[styles.wrapper, style]}
      // set deck size
      onLayout={(e) => {
        setDeckWidth(e.nativeEvent.layout.width);
        setDeckHeight(e.nativeEvent.layout.height);
      }}
    >
      {cardsFinal.map((card, i) => {
        const isFirstCard = i === 0;

        const zIndex = baseZIndex + (cards.length - i);

        const perspective = { perspective: 1000 };

        const position = !isFirstCard ? [] : movement.getTranslateTransform();

        const topCurrentCard = getTop(i);
        const topNextCard = isFirstCard ? 0 : getTop(i - 1);
        const top = movement.x.interpolate({
          inputRange: [-windowWidth, 0, windowWidth],
          outputRange: [topNextCard, topCurrentCard, topNextCard],
          extrapolate: "clamp",
        });

        const opacityCurrentCard = getOpacity(i);
        const opacityNextCard = isFirstCard ? 1 : getOpacity(i - 1);
        const opacity = movement.x.interpolate({
          inputRange: [-windowWidth, 0, windowWidth],
          outputRange: [opacityNextCard, opacityCurrentCard, opacityNextCard],
          extrapolate: "clamp",
        });

        const scaleCurrentCard = getScale(i);
        const scaleNextCard = isFirstCard ? 1 : getScale(i - 1);
        const scale = {
          scale: movement.x.interpolate({
            inputRange: [-windowWidth, 0, windowWidth],
            outputRange: [scaleNextCard, scaleCurrentCard, scaleNextCard],
            extrapolate: "clamp",
          }),
        };

        const rotate = !isFirstCard
          ? []
          : {
              rotate: movement.x.interpolate({
                inputRange: [-windowWidth, 0, windowWidth],
                outputRange: ["-20deg", "0deg", "20deg"],
                extrapolate: "clamp",
              }),
            };

        const transform = [].concat(scale, rotate, perspective, position);

        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={card.id}
            style={[
              styles.card,
              {
                top,
                zIndex,
                transform,
                opacity,
              },
            ]}
          >
            {card.renderCard({
              onLayout: (e) => {},
            })}
          </Animated.View>
        );
      })}
    </View>
  );
};

Deck.propTypes = {
  style: PropTypes.object,
  dismiss: PropTypes.func,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      component: PropTypes.any,
    })
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default Deck;
