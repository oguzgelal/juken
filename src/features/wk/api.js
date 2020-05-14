import _ from 'lodash';
import * as Analytics from 'expo-firebase-analytics';
import { request, collection } from 'src/features/wk/request';
import { GET, POST } from 'src/common/constants';
import { setUser, removeUser, setApiKey, removeApiKey } from 'src/features/wk/state';
import run from 'src/utils/run';
import sleep from 'src/utils/test/sleep';

import freeReviews from 'src/mock/freeReviews';
import freeSubjects from 'src/mock/freeSubjects';

/**
 * use GET user as a way to validate api key
 */
export const login = (args = {}) => async dispatch => {
  const { apiKey, onSuccess, onError, _start, _stop } = args;  
  
  try {
    run(_start);
    
    const user = await request({
      endpoint: 'user',
      method: GET,
      apiKey,
    });

    try {
      // capture basic user details
      await Analytics.setUserId(_.get(user, 'data.id'));
      await Analytics.setUserProperties({
        username: _.get(user, 'data.username'),
        level: String(_.get(user, 'data.level')),
        startedAt: _.get(user, 'data.started_at'),
        subActive: String(_.get(user, 'data.subscription.active')),
        subType: _.get(user, 'data.subscription.type'),
        subEnds: _.get(user, 'data.subscription.period_ends_at'),
      });
    } catch(e) {
      /** do nothing */
    }

    dispatch(setUser(user));
    dispatch(setApiKey(apiKey));

    run(_stop);
    run(onSuccess, user);

  } catch(e) {
    console.log('e', e);
    run(_stop);
    run(onError, e);
  }
};

/**
 * clear api key and user from state
 */
export const logout = ({ _stop }) => async dispatch => {
  dispatch(removeUser());
  dispatch(removeApiKey());
  run(_stop);
};

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
  const { onSuccess, onError, _start, _stop } = args;
  run(_start);
  await sleep(500);
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
    reviewId,
    incorrectMeanings,
    incorrectReadings,
  } = args;
  
  try {
    run(_start);

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
    });

    run(onSuccess, { res })
    run(_stop);

  } catch(e) {
    run(_stop);
    run(onError, e);
  }
  
}
