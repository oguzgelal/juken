/**
 * Hook that controls a review session
 */

import { useState, useCallback } from 'react';
import _ from 'lodash';
import listToDict from 'src/utils/listToDict';
import { useWkLoading } from 'src/features/wk/hooks';
import { getReviewMaterial } from 'src/features/wk/api';
import queueReviews from 'src/features/reviews/queueReviews';
import randomIndex from 'src/utils/randomIndex';

export default () => {

  const [ queue, setQueue ] = useState([]);
  const [ subjectsDict, setSubjectsDict ] = useState({});
  
  const [ reviewCount, setReviewCount ] = useState(0);
  const [ queueCount, setQueueCount ] = useState(0);
  const [ answers, setAnswers ] = useState({})

  // load reviews
  const reviewLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews: _reviews, subjects: _subjects }) => {
      
      // set reviews and subject data
      setSubjectsDict(listToDict(_subjects));
      setReviewCount(_reviews ? _reviews.length : 0);
      
      // create queue
      const _queue = queueReviews(_reviews);
      setQueue(_queue);
      setQueueCount(_queue.length);
    }
  });

  // submit answer for the top of the queue item
  const submitAnswer = correct => {
    const queueItem = queue.slice(0, 1)[0];
    // const { review, reviewType } = queueItem;

    // remove item from the top of the list
    const newQueue = queue.slice(1);
    
    // if answer was incorrect, put the item back
    // into the queue randomly
    if (!correct) {
      let requeueIndex = randomIndex(newQueue);
      
      // for a better experience, we want to requeue
      // an item at least five - ten levels back. if the
      // current queue is empty (so the requeue index
      // is -1) or if it has less than 10 items, splice
      // statement will put the item to the end of the
      // array, so we don't have to check for overflows
      requeueIndex += 10;

      // put the item back into the queue
      newQueue.splice(requeueIndex, 0, queueItem);
    }
    
    // set the new queue
    setQueue(newQueue || []);
  }

  return {
    queue,
    submitAnswer,
    reviewLoading,
    subjectsDict,
    reviewCount,
    queueCount,
  }

}