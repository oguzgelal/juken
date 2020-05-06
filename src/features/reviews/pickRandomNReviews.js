import pickRandomReview from 'src/features/reviews/pickRandomReview';

// pick multiple reviews from the list, respecting the
// removed items from the list from the previous loop
const pickRandomNReviews = (n, reviews, halfFinished, picked = []) => {

  // pick at random
  const currentPickRes = pickRandomReview(reviews, halfFinished);
  
  // no (more) items to pick
  if (!currentPickRes) return [ picked, reviews ];
  
  const [ currentPick, newReviews ] = currentPickRes;
  const newPicks = picks.concat(currentPick);
  
  // picked enough
  if (newPicks.length === n) return [ newPicks, newReviews ];

  // keep on picking more
  return pickRandomNReviews(n, newReviews, halfFinished, newPicks)
}

export default pickRandomNReviews;
