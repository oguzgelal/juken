import { action, thunk } from 'easy-peasy';
import { GET } from 'src/common/constants';
import { collection } from 'src/features/wk/request';
import sleep from 'src/utils/test/sleep';
import freeAssignments from 'src/mock/freeAssignments';
import freeSubjects from 'src/mock/freeSubjects';

export const reviews = {
  assignments: [],
  subjects: [],

  /** actions */

  saveReviews: action((state, { assignments, subjects }) => {
    state.assignments = assignments;
    state.subjects = subjects;
  }),
  
  /** thunks */

  loadAvailableDemo: thunk(async (action, { callback }, { getStoreActions }) => {
    const { loadings } = getStoreActions();
    loadings.start('loadAvailable');
    await sleep(1000);
    loadings.stop('loadAvailable');
    callback();
    action.saveReviews({
      assignments: freeAssignments,
      subjects: freeSubjects,
    })
  }),

  loadAvailable: thunk(async (action, { callback }, { getStoreActions }) => {
    const { loadings } = getStoreActions();
    loadings.start('loadAvailable');

    try {

      // get immediately available reviews
      const assignments = await collection({
        endpoint: 'assignments',
        method: GET,
        params: {
          immediately_available_for_review: true
        },
      });

      // stop here if there are no immediate reviews
      if (!assignments || assignments.length === 0) {
        loadings.stop('loadAvailable');
        callback();
        return;
      }

      // get subjects for these
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

      console.log('>', { assignments, subjects });
      loadings.stop('loadAvailable');
      action.saveReviews({ assignments, subjects })
      callback();

    } catch(e) {
      console.log('e', e);
      loadings.stop('loadAvailable');
      callback();
    }
  }),

}