import _ from 'lodash';
import { request, collection } from 'src/features/wk/request';
import { GET, POST } from 'src/common/constants';
import { setUser, removeUser, setApiKey, removeApiKey } from 'src/features/wk/state';
import run from 'src/utils/run';

/**
 * use GET user as a way to validate api key
 */
export const login = (opts = {}) => async dispatch => {
  const { apiKey, onSuccess, onError, _start, _stop } = opts;

  try {    
    run(_start);

    const user = await request({
      key: 'login',
      endpoint: 'user',
      method: GET,
      apiKey,
    });

    dispatch(setUser(user));
    dispatch(setApiKey(apiKey));

    run(_stop);
    run(onSuccess, user);

  } catch(e) {
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
export const getReviewMaterial = (opts = {}) => async () => {
  const { onSuccess, onError, _start, _stop } = opts;

  run(_start);

  try {

    // get immediately available reviews
    const reviews = await collection({
      key: 'getReviewMaterial',
      endpoint: 'assignments',
      method: GET,
      params: {
        immediately_available_for_review: true
      },
    })

    // get subjects for these
    const subjects = await collection({
      key: 'getReviewMaterial',
      endpoint: 'subjects',
      method: GET,
      params: {
        ids: reviews
          .map(r => _.get(r, 'data.subject_id'))
          .filter(Boolean)
          .join(',')
      },
    })

    run(onSuccess, { reviews, subjects })
    run(_stop);

  } catch(e) {
    run(_stop);
    run(onError, e)
  }
}

