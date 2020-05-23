import { action, actionOn, computed, thunk } from 'easy-peasy';
import store from 'src/features/store';
import sleep from 'src/utils/test/sleep';

export const token = {
  data: null,
  save: action((state, payload) => { state.data = payload; }),
  clear: action(state => { state.data = null; })
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
  loginLoading: false,
  login: thunk(async (action, payload, { getStoreActions }) => {
    const { loadings } = getStoreActions();
    loadings.start('login');
    await sleep(2000);
    loadings.stop('login');
  })
};