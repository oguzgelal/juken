import { action, computed, thunk } from 'easy-peasy';
import { GET } from 'src/common/constants';
import { request } from 'src/features/wk/request';
import setUserAnalytics from 'src/features/events/setUserAnalytics';

export const session = {
  user: null,
  token: null,
  settings: {},

  /** actions */

  saveUser: action((state, { user, token }) => {
    state.user = user;
    state.token = token;
  }),

  saveSetting: action((state, { key, value }) => {
    if (!state.token) return;
    if (!state.settings[state.token]) state.settings[token] = {};
    state.settings[token][key] = value;
  }),

  logout: action(state => {
    state.user = null;
    state.token = null;
  }),

  /** computed */

  userSettings: computed(state => {
    return state.settings[state.token]
  }),

  /** thunks */

  login: thunk(async (action, { token, onFail }, { getStoreActions }) => {
    const { loadings } = getStoreActions();
    loadings.start('login');
    try {
      const user = await request({
        endpoint: 'user',
        method: GET,
        apiKey: token,
      });
      if (!user) throw 'Cannot log in';
      action.saveUser({ user, token });
      loadings.stop('login');
      setUserAnalytics(user);
    } catch(e) {
      onFail();
      loadings.stop('login');
    }
  }),
};