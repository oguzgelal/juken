import _ from 'lodash';
import randomIndex from 'src/utils/randomIndex';
import { RADICAL } from 'src/common/constants';

// pick a review from the review list at random
export default (reviews, halfFinished) => {

  // pick a random review from review list
  const randRwIndex = randomIndex(reviews);
  if (randRwIndex === -1) return null;

  const randRw = reviews[randRwIndex] || {};
  const randRwId = _.get(randRw, 'id');
  const randRwSubType = _.get(randRw, 'data.subject_type');

  // when we pick this review, should we keep it in list ?
  // a review is only finished when both its meaning and
  // reading is answered (or just meaning for radicals).
  // we should keep unfinished reviews in the list so they
  // could be picked up again
  const shouldKeep = (randRwSubType !== RADICAL)
    ? !!halfFinished[randRwId]
    : false;

  // if we are going to remove review from the list, we should
  // do it now and return the new review list from this function
  // as well as the new review, indicating the list should change
  const newReviews = !shouldKeep
    ? reviews.slice().splice(randRwIndex, 1)
    : reviews;

  // return [ <random picked review>, <new review list> ]
  return [ randRw, newReviews ];
}