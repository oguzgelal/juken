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

  loadAvailableDemo: thunk(async (action) => {
    await sleep(1000);
    action.saveReviews({
      assignments: freeAssignments.slice(),
      subjects: freeSubjects.slice(),
    });
  }),

  loadAvailable: thunk(async (action, { onEmpty }) => {
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