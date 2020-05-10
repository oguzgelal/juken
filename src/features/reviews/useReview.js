/**
 * Hook that controls a review session
 */

import { useState, useCallback } from 'react';
import _ from 'lodash';
import { MEANING, RADICAL } from 'src/common/constants';
import listToDict from 'src/utils/listToDict';
import { useWkLoading } from 'src/features/wk/hooks';
import { getReviewMaterial } from 'src/features/wk/api';
import queueReviews from 'src/features/reviews/queueReviews';
import randomIndex from 'src/utils/randomIndex';

export default () => {

  const [ queue, setQueue ] = useState([]);
  const [ subjectsDict, setSubjectsDict ] = useState({});
  
  // total
  // reviews
  const [ totalReviews, setTotalReviews ] = useState(0);
  const [ completedReviewsTmp, setCompletedReviewsTmp ] = useState({});
  const [ completedReviews, setCompletedReviews ] = useState({});
  const [ incorrectReviews, setIncorrectReviews ] = useState({});
  const [ incorrectMeanings, setIncorrectMeanings ] = useState({});
  const [ incorrectReadings, setIncorrectReadings ] = useState({});
  // cards
  const [ totalCards, setTotalCards ] = useState(0);
  const [ completedCards, setCompletedCards ] = useState({});
  const [ incorrectCards, setIncorrectCards ] = useState({});

  // load reviews
  const reviewLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews: _reviews, subjects: _subjects }) => {
      
      // set reviews and subject data
      setSubjectsDict(listToDict(_subjects));
      setTotalReviews(_reviews ? _reviews.length : 0);
      
      // create queue
      const _queue = queueReviews(_reviews);
      setQueue(_queue);
      setTotalCards(_queue.length);
    }
  });

  // submit answer for the top of the queue item
  const submitAnswer = correct => {
    const queueItem = queue.slice(0, 1)[0];
    const { id, review, reviewType } = queueItem;
    const reviewId = _.get(review, 'id');
    const subjectId = _.get(review, 'data.subject_id');
    const subject = _.get(subjectsDict, subjectId);
    const subjectType = _.get(subject, 'object');
    let isReviewCompleted = false;
    
    // if answered correctly, record review tmp val
    if (correct) {

      // is this review completed ? radicals has one review type, so they are
      // considered completed automatically. kanjis and vocabs has two
      // review types, so if they were answered once before, they are completed
      if (subjectType === RADICAL) isReviewCompleted = true;
      else isReviewCompleted = !!completedReviewsTmp[reviewId];

      // record review as (tmp) completed
      setCompletedReviewsTmp(Object.assign({}, completedReviewsTmp, {
        [reviewId]: true
      }))

      // a card is surely complete when answered correctly
      setCompletedCards(Object.assign({}, completedCards, { [id]: true }));
    }

    if (!correct) {
      setIncorrectCards(Object.assign({}, incorrectCards, { [id]: true }));
      setIncorrectReviews(Object.assign({}, incorrectReviews, { [reviewId]: true }));
      const setobj = reviewType === MEANING ? incorrectMeanings : incorrectReadings;
      const setfn = reviewType === MEANING ? setIncorrectMeanings : setIncorrectReadings;
      setfn(Object.assign({}, setobj, { [reviewId]: (setobj[reviewId] || 0) + 1 }))
    }

    // set review as completed
    if (isReviewCompleted) {
      setCompletedReviews(Object.assign({}, completedReviews, {
        [reviewId]: true
      }))
    }

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

    totalCards,
    totalReviews,
    completedCards,
    completedReviews,
    incorrectCards,
    incorrectReviews,
    incorrectMeanings,
    incorrectReadings,
  }

}