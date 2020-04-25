import { useMemo } from 'react';

export default cards => {
  return useMemo(() => {
    const final = Array.isArray(cards) ? cards : [];
    
    return {
      cardsFinal: final,
      topCard: final[0] || null,
    };
  }, [cards]);
}