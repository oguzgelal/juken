import { action, actionOn, computed, thunk } from 'easy-peasy';
import store from 'src/features/store';
import { GET, POST } from 'src/common/constants';
import { request, collection } from 'src/features/wk/request';
import setUserAnalytics from 'src/features/events/setUserAnalytics';

export const token = {
  data: null,
  save: action((state, data) => state.data = data),
  clear: action(state => state.data = null),
};

export const settings = {
  data: {},
  save: action((state, { key, value }) => {
    const token = store.getState().token;
    if (!token) return;
    if (!state.data[token]) state.data[token] = {};
    state.data[token][key] = value
  }),
  user: computed([
      (state, _) => state.data,
      (_, storeState) => storeState.token.data,
    ],
    (settings, token) => settings[token] || {}
  )
};

export const user = {
  data: null,
  save: action((state, data) => action.data = data),
  login: thunk(async (action, { token: tkn, onFail }, { getStoreActions }) => {
    const { loadings, token } = getStoreActions();
    try {
      loadings.start('login');
      const res = await request({
        endpoint: 'user',
        method: GET,
        apiKey: tkn,
      });
      if (!res) {
        throw 'Cannot log in';
      }
      setUserAnalytics(res);
      action.save(res);
      token.save(tkn);
      loadings.stop('login');
    } catch(e) {
      console.log('e',e);
      onFail();
      loadings.stop('login');
    }
  }),
  logout: action(state => {
    const { token } = getStoreActions();
    state.data = null;
    token.clear();
  })
};