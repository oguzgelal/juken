import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default demo => {
  const [ loading, setLoading ] = useState(true);

  const loadReviewsMain = useStoreActions(actions => actions.reviews.loadAvailable);
  const loadReviewsDemo = useStoreActions(actions => actions.reviews.loadAvailableDemo);
  const loadReviews = demo ? loadReviewsDemo : loadReviewsMain;

  const assignments = useStoreState(state => state.reviews.assignments);
  const subjects = useStoreState(state => state.reviews.subjects);

  const loadReviewsFn = () => {
    setLoading(true);
    loadReviews({
      onEmpty: () => {
        setLoading(false);
      }
    });
  }

  // stop loading when assignments
  // and subjects are set
  useEffect(() => { setLoading(false);}, [
    assignments,
    subjects
  ]);

  // start loading
  useEffect(() => {
    loadReviewsFn();
  }, []);

  return {
    loadReviews: loadReviewsFn,
    loadingReviews: loading,
    // I accidentally referred to 'assignments' as 'reviews, which
    // is making things super confusing. TODO: change the terminology
    reviews: assignments,
    subjects,
  }
}