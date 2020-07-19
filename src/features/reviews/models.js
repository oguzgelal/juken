import _ from 'lodash';
import { action, thunk, thunkOn } from 'easy-peasy';
import { GET, POST, RETRY_BATCH_SIZE } from 'src/common/constants';
import { request, collection } from 'src/features/wk/request';
import sleep from 'src/utils/test/sleep';
import freeAssignments from 'src/mock/freeAssignments';
import freeSubjects from 'src/mock/freeSubjects';
import toChunks from 'src/utils/toChunks';

// TODO: it's too late for Typescript, but maybe
// integrate Flow to make this less painful.

// reviewSubmission:
// {
//   demo,
//   reviewId,
//   subjectId,
//   incorrectMeanings,
//   incorrectReadings,
// }

export const reviews = {
  assignments: [],
  subjects: [],
  submissionQueue: [],
  submissionErrors: [],

  /** actions */

  _saveReviews: action((state, { assignments, subjects }) => {
    state.assignments = assignments;
    state.subjects = subjects;
    state.submissionQueue = [];
    state.submissionErrors = [];
  }),

  // add review to the submission queue
  _addToSubmissionQueue: action((state, reviewSubmission) => {
    state.submissionQueue.unshift(reviewSubmission);
  }),

  // remove review from submission queue
  _removeFromSubmissionQueue: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionQueue.map(s => s.reviewId).indexOf(reviewId);
    if (ind !== -1) state.submissionQueue.splice(ind, 1);
  }),

  // add review to errors
  _addToSubmissionErrors: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionErrors.map(s => s.reviewId).indexOf(reviewId);
    if (ind === -1) state.submissionErrors.push(reviewSubmission);
  }),

  // remove review from errors
  _removeFromSubmissionErrors: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionErrors.map(s => s.reviewId).indexOf(reviewId);
    if (ind !== -1) state.submissionErrors.splice(ind, 1);
  }),

  // ignore everything in the submit queue + the errors
  ignoreSubmissionErrors: action(state => {
    state.submissionQueue = [];
    state.submissionErrors = [];
  }),
  
  /** thunks */

  // call this when a review is queued for submission
  submitReview: thunk((actions, reviewSubmission) => {
    actions._addToSubmissionQueue(reviewSubmission);
  }),

  // success! remove from submission queue / errors list
  _submitSuccess: thunk((actions, reviewSubmission) => {
    actions._removeFromSubmissionQueue(reviewSubmission);
    actions._removeFromSubmissionErrors(reviewSubmission);
  }),

  // error! add submission to errors list
  _submitFail: thunk((actions, reviewSubmission) => {
    actions._addToSubmissionErrors(reviewSubmission);
  }),

  // try submitting all submissions that has errored
  // 1. pick received items the submission errors in state
  // 2. split it into the retry batch size
  // 3. send parallel requests for all items in the batch and await
  // 4. if there are more items, self dispatch and pass remaining items 
  // 5. base case: no more items to retry - do nothing
  retrySubmission: thunk(async (actions, { items } = {}, { getState }) => {
    const state = getState();
    const currentErrors = items || state.submissionErrors;
    const retry = currentErrors.slice(0, RETRY_BATCH_SIZE);
    const retryNext = currentErrors.slice(RETRY_BATCH_SIZE);

    // retry everything
    await Promise.all(retry.map(reviewSubmission => (
      new Promise(resolve => {
        actions._submitReview({
          reviewSubmission,
          callback: resolve
        })
      })
    )))

    // if there are more items to retry, self dispatch
    if (retryNext.length > 0) {
      actions.retrySubmission({ items: retryNext });
    }
  }),

  // submit a review to wanikani
  _submitReview: thunk(async (actions, { reviewSubmission, callback }) => {
    try {
      const {
        demo,
        reviewId,
        // subjectId,
        incorrectMeanings,
        incorrectReadings,
      } = reviewSubmission;

      // submission from the demo
      if (demo) {
        await sleep(1000);
        actions._submitSuccess(reviewSubmission);
        if (typeof callback === 'function') callback();
        return;
      }
  
      const res = await request({
        endpoint: 'reviews',
        method: POST,
        body: {
          review: {
            assignment_id: reviewId,
            incorrect_meaning_answers: incorrectMeanings || 0,
            incorrect_reading_answers: incorrectReadings || 0,
          }
        }
      })
  
      const hasError = (
        _.get(res, 'resources_updated.assignment.id') !== reviewId
      );
  
      if (hasError) {
        actions._submitFail(reviewSubmission);
      } else {
        actions._submitSuccess(reviewSubmission);
      }
    }
    catch(e) {
      actions._submitFail(reviewSubmission);
    }

    if (typeof callback === 'function') {
      callback();
    }
  }),

  // trigger submit review when a review 
  // is added to the submission queue
  _submitReviewFromQueue: thunkOn(
    actions => actions._addToSubmissionQueue,
    async (actions, _, { getState }) => {
      const state = getState();
      const reviewSubmission = state.submissionQueue[0];
      if (!reviewSubmission) return;
      actions._submitReview({ reviewSubmission });
    }
  ),

  // load immediately available reviews
  loadAvailable: thunk(async (action, { demo, onEmpty }) => {

    if (demo) {
      await sleep(200);
      action._saveReviews({
        assignments: freeAssignments.slice(),
        subjects: freeSubjects.slice(),
      });

      return;
    }

    try {

      // get immediately available assignments
      const assignments = await collection({
        endpoint: 'assignments',
        method: GET,
        params: {
          immediately_available_for_review: true
        },
      });

      // stop here if there are no immediate assignments
      if (!assignments || assignments.length === 0) {
        onEmpty();
        return;
      }

      /**
       * Note: WaniKani api's pagination limit for subjects is
       * 1000, however browser fails to load 1000 items at once,
       * so spread subject ids into chunks of 500 and send requests
       * in parallel
       */

      // get all ids to fetch
      const subjectIds = assignments
        .map(r => _.get(r, 'data.subject_id'))
        .filter(Boolean);
      
      // spread ids into chunks and request them in parallel
      const chunks = await Promise.all(
        toChunks(subjectIds, 500).map(chunk => {
          return request({
            endpoint: 'subjects',
            method: GET,
            params: {
              ids: chunk.join(',')
            }
          })
        })
      );

      // combine chunks that was fetched
      const subjects = chunks
        .map(c => c.data)
        .flat();

      // save assignments and subjects to state
      action._saveReviews({
        assignments,
        subjects,
      })

    } catch(e) {
      onEmpty();
    }
  }),

}