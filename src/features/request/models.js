import { action } from 'easy-peasy';

export const loadings = {
  start: action((state, id) => { state[id] = true; }),
  stop: action((state, id) => { delete state[id]; })
}