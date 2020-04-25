import { useState, useEffect } from 'react';

export default ({
  deckWidth,
  deckHeight,
  windowWidth,
  windowHeight,
}) => {
  
  // off screen position of cards
  const [offScreenXLeft, setOffScreenXLeft] = useState(null);
  const [offScreenXRight, setOffScreenXRight] = useState(null);
  const [offScreenY, setOffScreenY] = useState(null);

  // calculate off screen positions of cards
  useEffect(() => {
    setOffScreenY(windowHeight / 2 - deckHeight / 2);
    setOffScreenXLeft(-windowWidth - deckWidth);
    setOffScreenXRight(windowWidth + deckWidth);
  }, [
    deckWidth,
    deckHeight,
    windowWidth,
    windowHeight
  ]);

  return {
    y: offScreenY,
    x: {
      left: offScreenXLeft,
      right: offScreenXRight,
    },
  }
}