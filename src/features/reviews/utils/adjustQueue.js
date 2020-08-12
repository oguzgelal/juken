/**
 * https://github.com/oguzgelal/juken/issues/8
 * 
 * Adjust distances between subject pairs items to
 * make sure that they are not too far apart
 * Also used to implement back-to-back sorting
 *
 */

import _ from 'lodash';

import { MEANING, RADICAL } from 'src/common/constants';

const ALLOWED_MAX_DISTANCE = 10;
const ALLOWED_MIN_DISTANCE = 3;

const adjustSubjectPairDistances = (queue,
                                    currentIndex,
                                    backToBackMode,
                                    meaningFirst) => {
  const newQueue = queue.slice();

  // base case - return when queue is empty
  if (newQueue.length === 0) return [];

  // base case - all items are adjusted
  if (currentIndex === newQueue.length - 1) return newQueue;

  // get current item
  const currentItem = newQueue[currentIndex];
  const currentReviewId = _.get(currentItem, 'review.id');

  // skip this item if it's a radical
  if (currentItem.reviewType === RADICAL) {
    return adjustSubjectPairDistances(newQueue, currentIndex + 1,
      backToBackMode, meaningFirst);
  }

  // get current reviews pair in the queue after it
  // Note: findIndex transformation is supported by metro-react-native-babel-preset (expo sdk37)
  // https://docs.expo.io/versions/latest/react-native/javascript-environment/#polyfills
  let pairIndex = newQueue.slice(currentIndex + 1).findIndex(item => (
    _.get(item, 'review.id') === currentReviewId
  ))

  // pair of the current review could not be found in the queue
  // after it's index. this means it's either a radical (having no
  // pair), or it's pair was already adjusted priorly. either case,
  // it's safe to skip this item
  if (pairIndex === -1) {
    return adjustSubjectPairDistances(newQueue, currentIndex + 1,
      backToBackMode, meaningFirst);
  }

  // we sliced the first half of the array to reduce the search iterations
  // and to prevent not finding the first pair while looking for the second
  // pair in the queue. but this shifted the index by however much we sliced,
  // so add the length of the sliced off part back to adjust.
  pairIndex += currentIndex + 1;

  // get a random distance of how much to push the
  // item's pair from it's current index
  const randomDistance = _.random(
    ALLOWED_MIN_DISTANCE,
    ALLOWED_MAX_DISTANCE
  );
  const backToBackDistance = ((currentItem.reviewType === MEANING) ===
      meaningFirst) ? 1 : 0;
  const pairDistance = backToBackMode ? backToBackDistance : randomDistance;
  
  // remove the pair from it's current position
  const tmp = newQueue.splice(pairIndex, 1)[0];

  // place the pair to it's new location closer to the
  // current review. if the new location overflows, splice 
  // will place it to the end, which works in our case 
  newQueue.splice(currentIndex + pairDistance, 0, tmp);

  // recurse from the next item
  return adjustSubjectPairDistances(newQueue, currentIndex + 1,
    backToBackMode, meaningFirst);
}

export default adjustQueue = (queue, backToBackMode = false, meaningFirst = false) => {
  const result = adjustSubjectPairDistances(queue, 0, backToBackMode, meaningFirst);
  if (backToBackMode) {
    let msg = "adjusted queue of length " + result.length + ":";
    let lastid = -1;
    for (var i = 0; i < result.length; i++) {
      const id = _.get(result[i], 'review.id');
      if (id != lastid) msg += '\n';
      msg += id + ' ';
      lastid = id;
    }
    console.warn(msg);
  }
  return result;
}
