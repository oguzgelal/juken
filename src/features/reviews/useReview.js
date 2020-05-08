/**
 * Hook that controls a review session
 */

import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    console.log('AAAAAAAAAAAAAA');
  }, [])

  // load reviews
  console.log('rendering !!!');
  const reviewLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews, subjects }) => {
      setSubjectsDict(listToDict(subjects));
      setReviewCount(reviews ? reviews.length : 0);
      setQueue(queueReviews(reviews))
    }
  });  

  return {
    queue,
    reviewLoading,
    subjectsDict,
  }

}