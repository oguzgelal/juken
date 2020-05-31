import _ from 'lodash';
import { action, thunk, thunkOn } from 'easy-peasy';
import { GET, POST } from 'src/common/constants';
import { request, collection } from 'src/features/wk/request';
import sleep from 'src/utils/test/sleep';
import freeAssignments from 'src/mock/freeAssignments';
import freeSubjects from 'src/mock/freeSubjects';

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

  saveReviews: action((state, { assignments, subjects }) => {
    state.assignments = assignments;
    state.subjects = subjects;
    state.submissionQueue = [];
    state.submissionErrors = [];
  }),

  // add review to the submission queue
  addToSubmissionQueue: action((state, reviewSubmission) => {
    state.submissionQueue.unshift(reviewSubmission);
  }),

  // remove review from submission queue
  removeFromSubmissionQueue: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionQueue.map(s => s.reviewId).indexOf(reviewId);
    if (ind !== -1) state.submissionQueue.splice(ind, 1);
  }),

  // add review to errors
  addToSubmissionErrors: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionErrors.map(s => s.reviewId).indexOf(reviewId);
    if (ind === -1) state.submissionErrors.push(reviewSubmission);
  }),

  // remove review from errors
  removeFromSubmissionErrors: action((state, reviewSubmission) => {
    const { reviewId } = reviewSubmission;
    const ind = state.submissionErrors.map(s => s.reviewId).indexOf(reviewId);
    if (ind !== -1) state.submissionErrors.splice(ind, 1);
  }),
  
  /** thunks */

  // submit a review to wanikani
  submitReview: thunk(async (actions, reviewSubmission) => {
    try {
      const {
        reviewId,
        // subjectId,
        incorrectMeanings,
        incorrectReadings,
      } = reviewSubmission;
  
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
        // if there was an error, add submission to errors list
        actions.addToSubmissionErrors(reviewSubmission);
      } else {
        // otherwise remove from submission queue / errors list
        actions.removeFromSubmissionQueue(reviewSubmission);
        actions.removeFromSubmissionErrors(reviewSubmission);
      }
    }
    catch(e) {
      // request failed, add submission to errors list
      actions.addToSubmissionErrors(reviewSubmission);
    }
  }),

  // trigger submit review when a review 
  // is added to the submission queue
  submitReviewFromQueue: thunkOn(
    actions => actions.addToSubmissionQueue,
    async (actions, target, { getState }) => {
      const state = getState();
      const reviewSubmission = state.submissionQueue[0];
      if (!reviewSubmission) return;

      if (_.get(target, 'payload.demo')) {
        await sleep(1000);
        actions.removeFromSubmissionQueue(reviewSubmission);
      } else {
        actions.submitReview(reviewSubmission);
      }
    }
  ),

  // load immediately available reviews
  loadAvailable: thunk(async (action, { demo, onEmpty }) => {

    if (demo) {
      await sleep(1000);
      action.saveReviews({
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

      // get subjects for these assignments
      const subjects = await collection({
        endpoint: 'subjects',
        method: GET,
        params: {
          ids: assignments
            .map(r => _.get(r, 'data.subject_id'))
            .filter(Boolean)
            .join(',')
        },
      });

      // save assignments and subjects to state
      action.saveReviews({
        assignments,
        subjects,
      })

    } catch(e) {
      onEmpty();
    }
  }),

}