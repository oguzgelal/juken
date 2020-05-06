import { MEANING, READING } from 'src/common/constants';

// return meaning or reading of a review randomly
export default () => {
  return 2 * Math.random() << 0 === 0
    ? MEANING
    : READING;
}