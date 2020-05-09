/**
 * Hook that controls a review session
 */

import { useState, useCallback } from 'react';
import _ from 'lodash';
import listToDict from 'src/utils/listToDict';
import { useWkLoading } from 'src/features/wk/hooks';
import { getReviewMaterial } from 'src/features/wk/api';
import queueReviews from 'src/features/reviews/queueReviews';

export default () => {

  const [ queue, setQueue ] = useState([]);
  const [ subjectsDict, setSubjectsDict ] = useState({});
  
  const [ reviewCount, setReviewCount ] = useState(0);
  const [ correct, setCorrect ] = useState({});
  const [ correctCount, setCorrectCount ] = useState(0);
  const [ incorrect, setIncorrect ] = useState({});
  const [ incorrectCount, setIncorrectCount ] = useState(0);

  // load reviews
  const reviewLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews, subjects }) => {
      setSubjectsDict(listToDict(subjects));
      setReviewCount(reviews ? reviews.length : 0);
      setQueue(queueReviews(reviews))
    }
  });

  // submit answer for the top of the queue item
  const submitAnswer = correctness => {
    console.log('was it correct: ', correctness);
    // const item = queue.slice(0, 1);
    const newQueue = queue.slice(1);
    setQueue(newQueue || []);
  }

  return {
    queue,
    submitAnswer,
    reviewLoading,
    subjectsDict,
  }

}