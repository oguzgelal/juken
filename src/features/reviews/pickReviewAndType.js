import _ from 'lodash';
import randomIndex from 'src/utils/randomIndex';
import getReviewType from 'src/features/reviews/getReviewType';

// pick a review and a review type at random
export default (reviews, reviewTypesHistory) => {

  // pick a random review from review list
  const reviewIndex = randomIndex(reviews);
  const review = reviews[reviewIndex];
  const reviewId = _.get(review, 'id');
  
  // no (more) reviews to pick from
  if (!review) return [];

  // pick a review type for this review and decide
  // when we pick this review, should we keep it in list ?
  // a review is only finished when both its meaning and
  // reading is answered (or just meaning for radicals).
  // we should keep unfinished reviews in the list so they
  // could be picked up again
  const [ shouldKeep, reviewType ] = getReviewType(
    _.get(review, 'data.subject_type'),
    _.get(reviewTypesHistory, reviewId)
  );

  // mark the review type that was picked
  // for the next iterations
  const newReviewTypesHistory = {
    ...reviewTypesHistory,
    [reviewId]: reviewType
  }

  // if we are going to remove review from the list, we should
  // do it now and return the new review list from this function
  // as well as the new review, indicating the list should change
  const newReviews = reviews.slice();
  if (!shouldKeep) newReviews.splice(reviewIndex, 1);

  return [
    review,
    reviewType,
    newReviews,
    newReviewTypesHistory,
  ];
}