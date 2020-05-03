import { createSlice } from '@reduxjs/toolkit';
import resource, { r } from 'src/utils/resource';

const NAME = 'wk';

const wk = createSlice({
  name: NAME,
  initialState: {},
  reducers: {
    setApiKey: resource.set(r.API_KEY),
    removeApiKey: resource.clear(r.API_KEY),
    setUser: resource.set(r.USER),
    removeUser: resource.clear(r.USER),
  }
})

export const select = resource.selectNamespace(NAME);

export const { setApiKey } = wk.actions;
export const { removeApiKey } = wk.actions;
export const { setUser } = wk.actions;
export const { removeUser } = wk.actions;

export default wk.reducer;
