/**
 * Hook that controls a review session
 */

import { useState, useEffect } from 'react';
import _ from 'lodash';
import listToDict from 'src/utils/listToDict';
import { useWkLoading } from 'src/features/wk/hooks';
import { getReviewMaterial } from 'src/features/wk/api';

import randomReviewType from 'src/features/reviews/randomReviewType';
import pickRandomReview from 'src/features/reviews/pickRandomReview';
import pickRandomNReviews from 'src/features/reviews/pickRandomNReviews';

export default () => {

  const [ reviews, setReviews ] = useState([]);
  const [ subjects, setSubjects ] = useState({});
  const [ renderQueue, setRenderQueue ] = useState([]);
  
  const [ reviewCount, setReviewCount ] = useState(0);
  const [ halfFinished, setHalfFinished ] = useState({});
  const [ correct, setCorrect ] = useState({});
  const [ correctCount, setCorrectCount ] = useState(0);
  const [ incorrect, setIncorrect ] = useState({});
  const [ incorrectCount, setIncorrectCount ] = useState(0);
  
  // load reviews
  const reviewLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews: lr, subjects: ls }) => {
      
      // set subjects
      setSubjects(listToDict(subjects));
      setReviewCount(lr ? lr.length : 0);
      
      // fill up the render queue
      // TODO: keeping two staged items seems a bit funky and
      // inefficient. Maybe it's best to queue everything once
      // in the beginning, then requeue some items if necessary 
      const [ picks, newReviews ] = pickRandomNReviews(2, lr, halfFinished);
      setRenderQueue(picks);
      
      // set reviews
      setReviews(newReviews);
    }
  })

  return {
    reviewLoading,
    renderQueue,
  }

}