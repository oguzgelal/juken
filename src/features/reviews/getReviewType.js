import {
  MEANING,
  READING,
  RADICAL,
} from 'src/common/constants';

// return meaning or reading of a review randomly
export default (subjectType, prevReviewType) => {
  let shouldKeep = true;
  let reviewType = null;

  // if a subject is radical, it can only
  // have a review type of meaning
  if (subjectType === RADICAL) {
    shouldKeep = false;
    reviewType = MEANING;
  }

  // if a review type was picked before for
  // a given review, return the other review type
  else if (prevReviewType) {
    shouldKeep = false;
    reviewType = prevReviewType === MEANING
      ? READING
      : MEANING
  }

  // otherwise, pick a random review type 
  else {
    shouldKeep = true;
    reviewType = 2 * Math.random() << 0 === 0
      ? MEANING
      : READING;
  }
  
  return [
    shouldKeep,
    reviewType,
  ]
}