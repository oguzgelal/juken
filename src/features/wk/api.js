import _ from 'lodash';
import { request, collection } from 'src/features/wk/request';
import { GET, POST } from 'src/common/constants';
import run from 'src/utils/run';
import sleep from 'src/utils/test/sleep';

import freeReviews from 'src/mock/freeReviews';
import freeSubjects from 'src/mock/freeSubjects';

/**
 * get immediately available reviews and their subjects
 */
export const getReviewMaterial = (args = {}) => async () => {
  const { onSuccess, onError, _start, _stop } = args;

  try {
    run(_start);

    // get immediately available reviews
    const reviews = await collection({
      endpoint: 'assignments',
      method: GET,
      params: {
        immediately_available_for_review: true
      },
    }) || [];

    // stop here if there are no immediate reviews
    if (reviews.length === 0) {
      run(_stop);
      run(onSuccess, { reviews, subjects: [] })
      return;
    }
    
    // get subjects for these
    const subjects = await collection({
      endpoint: 'subjects',
      method: GET,
      params: {
        ids: reviews
          .map(r => _.get(r, 'data.subject_id'))
          .filter(Boolean)
          .join(',')
      },
    })

    run(_stop);
    run(onSuccess, { reviews, subjects });

  } catch(e) {
    run(_stop);
    run(onError, e);
  }
}

/**
 * return demo review materials with a delay
 */
export const getReviewMaterialDemo = (args = {}) => async () => {
  const { onSuccess, _start, _stop } = args;
  run(_start);
  await sleep(1000);
  run(_stop);
  run(onSuccess, { reviews: freeReviews, subjects: freeSubjects })
}

/**
 * submit a review
 */
export const submitReview = (args = {}) => async () => {
  const {
    onSuccess,
    onError,
    _start,
    _stop,
    resubmit,
    reviewId,
    subjectId,
    incorrectMeanings,
    incorrectReadings,
  } = args;

  const submit = _.get(resubmit, 'submit') || {
    assignment_id: reviewId,
    incorrect_meaning_answers: incorrectMeanings || 0,
    incorrect_reading_answers: incorrectReadings || 0,
  };
  
  const objectToResubmitOnError = _.get(resubmit, 'submit')
  ? resubmit
  : {
    reviewId,
    subjectId,
    submit,
  };
  
  try {
    run(_start);

    const res = await request({
      endpoint: 'reviews',
      method: POST,
      body: { review: submit }
    });

    // if we can't get confirmation on the resource that we submitted was updated,
    // consider it a submission error. pass the data on err so we can resubmit.
    const hasError = (
      _.get(res, 'resources_updated.assignment.id') !== reviewId &&
      _.get(res, 'resources_updated.assignment.id') !== _.get(resubmit, 'reviewId')
    );
    
    if (hasError) {
      run(onError, { objectToResubmitOnError })
    } else {
      run(onSuccess, { res, isResubmitting: !!_.get(resubmit, 'submit') })
    }

    run(_stop);

  } catch(e) {
    run(_stop);
    run(onError, { e, objectToResubmitOnError });
  }
  
}
