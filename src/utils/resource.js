import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

// for convenience :(
import * as rs from 'src/common/resources';
export const r = rs;

const DATA = 'data';
const LAST_FETCHED = 'last_fetched';

const set = key => ({
  prepare: value => ({
    payload: {
      [key]: value,
      [LAST_FETCHED]: moment().toISOString()
    }
  }),
  reducer: (state, action) => {
    const { payload } = action;
    state[key] = {
      [DATA]: payload[key],
      [LAST_FETCHED]: payload[LAST_FETCHED],
    }
  }
});

const get = state => key => {
  return _.get(state, [ key, DATA ].flat())
};

const select = key => {
  return useSelector(state => get(state)(key))
};

const selectNamespace = namespace => {
  return selectFn => select([namespace, selectFn(r)]);
}

const clear = key => state => {
  delete state[key];
};

export default {
  set,
  get,
  select,
  selectNamespace,
  clear,
};