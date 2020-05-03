import { createSlice } from '@reduxjs/toolkit';
import resource, { r } from 'src/utils/resource';

const NAME = 'wk';

const wkSlice = createSlice({
  name: NAME,
  initialState: {},
  reducers: {
    setApiKey: resource.set(r.API_KEY),
    removeApiKey: resource.clear(r.API_KEY),
    setUser: resource.set(r.USER),
    removeUser: resource.clear(r.USER),
  }
})

const { actions, reducer } = wkSlice;

export const { setApiKey } = actions;
export const { removeApiKey } = actions;
export const { setUser } = actions;
export const { removeUser } = actions;

export const wk = resource.selectNamespace(NAME);

export default reducer;