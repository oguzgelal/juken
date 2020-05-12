// 0 -> 1 : Apprentice
// 4 -> 5 : Guru
// 6 -> 7 : Master
// 7 -> 8 : Enlightened
// 8 -> 9 : Burned

import {
  APPRENTICE,
  GURU,
  MASTER,
  ENLIGHTENED,
  BURNED,
} from 'src/common/constants';

export default (current, next) => {
  if (current === 0 && next === 1) return APPRENTICE;
  if (current === 4 && next === 5) return GURU;
  if (current === 6 && next === 7) return MASTER;
  if (current === 7 && next === 8) return ENLIGHTENED;
  if (current === 8 && next === 9) return BURNED;

  return null;
}