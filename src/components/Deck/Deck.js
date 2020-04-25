import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated } from "react-native";

import os from 'src/utils/os';

import useScreenSize from "src/hooks/useScreenSize";
import useEventListener from "src/hooks/useEventListener";
import useOffScreen from "src/components/Deck/useOffScreen";
import useDragRange from "src/components/Deck/useDragRange";
import useShuffleCards from "src/components/Deck/useShuffleCards";
import useMovement from "src/components/Deck/useMovement";
import usePanResponder from "src/components/Deck/usePanResponder";

const friction = 5;
const baseZIndex = 1;
const scaleDecreaseRate = 0.1;
const opacityDecreaseRate = 0.3;
const topGapRate = os('desktop') ? -5 : -32;
const leaveScreenDuration = 400;

const getOpacity = (i) => 1 - opacityDecreaseRate * i;
const getScale = (i) => 1 - scaleDecreaseRate * i;
const getTop = (i) => os('desktop') ? `${topGapRate * i}vh` : topGapRate * i;

const Deck = ({
  style = {},
  cards = [],
  dismiss,
  lockSwipe,
}) => {
  
  // dynamic window size
  const { windowWidth, windowHeight } = useScreenSize();

  // deck size
  const [deckWidth, setDeckWidth] = useState(null);
  const [deckHeight, setDeckHeight] = useState(null);

  // arrange cards
  const { cardsArr, topCard } = useShuffleCards(cards);

  // calculate coordinates which cards
  // will end up when they go off screen
  const offscreen = useOffScreen({
    deckWidth,
    deckHeight,
    windowWidth,
    windowHeight
  });

  // how far do you have to drag the cards
  // for them to be dismissed
  const dragRange = useDragRange({
    windowWidth,
    windowHeight,
  });

  // calculate stuff related to movement
  const {
    movement,
    getMovementInterpolation,
    getClearInterpolation,
  } = useMovement({
    dragRange,
    windowWidth,
    windowHeight,
  });

  // create and configure pan responder
  const {
    panResponder,
    freezeSwipe,
    triggerSwipeLeft,
    triggerSwipeRight,
  } = usePanResponder({
    leaveScreenDuration,
    dragRange,
    friction,
    movement,
    topCard,
    offscreen,
    dismiss,
  });

  // trigger keyboard shortcuts
  useEventListener({
    el: os('desktop') ? document : null,
    event: 'keydown',
    handler: e => {
      if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') triggerSwipeLeft();
      if (e.key === 'ArrowRight' || e.code === 'ArrowRight') triggerSwipeRight();
    }
  }, [offscreen])

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={(e) => {
        setDeckWidth(e.nativeEvent.layout.width);
        setDeckHeight(e.nativeEvent.layout.height);
      }}
    >
      {cardsArr.map((card, i) => {
        const isFirstCard = i === 0;
        const isSecondCard = i === 1;
        const [topCurrent, topNext] = [getTop(i), getTop(i - 1)];
        const [opCurrent, opNext] = [getOpacity(i), getOpacity(i - 1)];
        const [scCurrent, scNext] = [getScale(i), getScale(i - 1)];
        const panHandlers = (freezeSwipe || lockSwipe) ? {} : panResponder.panHandlers;

        const dynamicStyles = {
          zIndex: baseZIndex + (cards.length - i),
          top: getMovementInterpolation('x', [topNext, topCurrent, topNext]),
          opacity: getMovementInterpolation('x', [opNext, opCurrent, opNext]),
          transform: [
            { perspective: 1000 },
            { scale: getMovementInterpolation('x', [scNext, scCurrent, scNext]) },
            isFirstCard && { rotate: getMovementInterpolation('x', ["-20deg", "0deg", "20deg"]) },
            isFirstCard && movement.getTranslateTransform(),
          ].filter(Boolean).flat(),
        };

        return (
          <Animated.View
            {...panHandlers}
            key={card.id}
            style={[ styles.card, dynamicStyles ]}
          >
            {card.renderCard({
              isFirstCard,
              isSecondCard,
              getClearInterpolation,
              getMovementInterpolation,
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
  lockSwipe: PropTypes.bool,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      renderCard: PropTypes.func,
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
