import pickRandomReview from 'src/features/reviews/pickRandomReview';

// pick multiple reviews from the list, respecting the
// removed items from the list from the previous loop
const queueReviews = (reviews, queue, pickedOnce) => {

  // base case: no (more) reviews to pick
  if (reviews.length === 0) return queue;

  // pick a review at random
  const [ picked, newReviews ] = pickRandomReview(reviews, pickedOnce);
  
  // TODO: pick random review type
  // TODO: add current pick to pickedOnce dict with its review type
  // TODO: queue review along with it's type

  // add current pick to the queue
  const newQueue = queue.concat({
    reviewType: 'PICK RANDOM REVIEW TYPE HERE',
    review: picked
  });

  // keep on picking more
  return queueReviews(newReviews, newQueue, pickedOnce)
}

export default reviews => {
  return queueReviews(reviews, [], {});
};
