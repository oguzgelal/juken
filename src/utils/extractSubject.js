import React from 'react';
import _ from 'lodash';
import { MEANING, RADICAL } from 'src/common/constants';
import Radical from 'src/components/Radical/Radical';

export default (subject, reviewType) => {
  const subjectType = _.get(subject, 'object');
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
  
  let questionComponent = subjectType === RADICAL
    ? <Radical subject={subject} />
    : null;

  return {
    characters,
    meaningAccepted,
    meaningOther,
    readingAccepted,
    readingOther,
    question,
    questionComponent,
    answer,
  }
}