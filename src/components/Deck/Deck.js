import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

import useScreenSize from 'src/hooks/useScreenSize';
import useOffScreen from 'src/components/Deck/useOffScreen';
import useDragRange from 'src/components/Deck/useDragRange';
import useShuffleCards from 'src/components/Deck/useShuffleCards';
import useMovement from 'src/components/Deck/useMovement';
import usePanResponder from 'src/components/Deck/usePanResponder';

const baseZIndex = 1;
const topGapRate = -32;
const scaleDecreaseRate = 0.1;
const opacityDecreaseRate = 0.3;
const friction = 5;

const getTop = (i) => i * topGapRate;
const getOpacity = (i) => 1 - opacityDecreaseRate * i;
const getScale = (i) => 1 - scaleDecreaseRate * i;

const Deck = ({ style = {}, cards = [], dismiss }) => {

  // dynamic window size
  const { windowWidth, windowHeight } = useScreenSize();

  // deck size
  const [deckWidth, setDeckWidth] = useState(null);
  const [deckHeight, setDeckHeight] = useState(null);

  // calculate coordinates which cards
  // will end up when they go off screen
  const offscreen = useOffScreen(
    deckWidth,
    deckHeight,
    windowWidth,
    windowHeight,
  );

  // how far do you have to drag the cards
  // for them to be dismissed
  const dragRange = useDragRange(windowWidth);

  // arrange cards
  const { cardsFinal, topCard } = useShuffleCards(cards);

  // calculate stuff related to movement
  const { movement, getMovementAnimation } = useMovement(windowWidth);

  // create and configure pan responder
  const panResponder = usePanResponder({
    dragRange,
    friction,
    movement,
    topCard,
    offscreen,
    dismiss,
  })

  return (
    <View
      style={[styles.wrapper, style]}
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

        const top = getMovementAnimation(
          getTop(i),
          getTop(i - 1)
        );

        const opacity = getMovementAnimation(
          getOpacity(i),
          getOpacity(i - 1)
        );

        const scale = {
          scale: getMovementAnimation(
            getScale(i),
            getScale(i - 1)
          )
        };

        const rotate = !isFirstCard ? [] : {
          rotate: getMovementAnimation('0deg', '-20deg', '20deg')
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
      renderCard: PropTypes.func,
    })
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Deck;
