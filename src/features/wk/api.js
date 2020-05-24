import _ from 'lodash';
import { request, collection } from 'src/features/wk/request';
import { GET, POST } from 'src/common/constants';
import run from 'src/utils/run';

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
