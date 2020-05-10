import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import pickReviewAndType from 'src/features/reviews/pickReviewAndType';
// pick multiple reviews from the list, respecting the
// removed items from the list from the previous loop
const queueReviews = (reviews, reviewTypesHistory, queue) => {

  // base case: no (more) reviews to pick
  if (reviews.length === 0) return queue;

  // pick a review at random
  const [
    review,
    reviewType,
    newReviews,
    newReviewTypeHistory,
  ] = pickReviewAndType(reviews, reviewTypesHistory);

  // add current pick to the queue
  const newQueue = queue.concat({
    id: uuidv4(),
    review,
    reviewType,
  });

  // keep on picking more
  return queueReviews(
    newReviews,
    newReviewTypeHistory,
    newQueue,
  )
}

export default reviews => {
  return queueReviews(reviews, {}, []);
};
