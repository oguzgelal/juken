import { useMemo } from 'react';

export default ({
  deckWidth,
  deckHeight,
  windowWidth,
  windowHeight,
}) => (
  useMemo(() => ({
    y: windowHeight / 2 - deckHeight / 2,
    x: {
      left: -windowWidth - deckWidth,
      right: windowWidth + deckWidth,
    },
  }), [
    deckWidth,
    deckHeight,
    windowWidth,
    windowHeight
  ])
)