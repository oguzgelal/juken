import _ from 'lodash';
import { MEANING, READING } from 'src/common/constants';

export default (subject, reviewType) => {
  const characters = _.get(subject, 'data.characters');
  const meanings = _.get(subject, 'data.meanings') || [];
  const readings = _.get(subject, 'data.readings') || [];

  const meaningAccepted = meanings.filter(m => m.accepted_answer).map(m => m.meaning).join(', ');
  const meaningOther = meanings.filter(m => !m.accepted_answer).map(m => m.meaning).join(', ');
  const readingAccepted = readings.filter(m => m.accepted_answer).map(m => m.reading).join(', ');
  const readingOther = readings.filter(m => !m.accepted_answer).map(m => m.reading).join(', ');

  const question = characters;
  const answer = !reviewType ? null : (
    reviewType === MEANING
      ? meaningAccepted
      : readingAccepted
  );

  return {
    characters,
    meaningAccepted,
    meaningOther,
    readingAccepted,
    readingOther,
    question,
    answer,
  }
}