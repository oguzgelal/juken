import getReviewType from 'src/features/reviews/getReviewType';
import {
  MEANING,
  READING,
  RADICAL,
  KANJI,
  VOCABULARY,
} from 'src/common/constants';

describe('getReviewType', () => {

  // ****
  test('getReviewType should work - radical', () => {
    const grtRes = getReviewType(RADICAL, null);
    expect(grtRes).toEqual([ false, MEANING ])
  });

  // ****
  test('getReviewType should work with previous selection - kanji', () => {
    const grtRes1 = getReviewType(KANJI, READING);
    const grtRes2 = getReviewType(KANJI, MEANING);
    expect(grtRes1).toEqual([ false, MEANING ])
    expect(grtRes2).toEqual([ false, READING ])
  });
  
  // ****
  test('getReviewType should work no previous selection - kanji', () => {
    const grtRes = getReviewType(KANJI, null);
    expect([[ true, MEANING ], [ true, READING ]]).toContainEqual(grtRes)
  });
  
  // ****
  test('getReviewType should work with previous selection - vocab', () => {
    const grtRes1 = getReviewType(VOCABULARY, READING);
    const grtRes2 = getReviewType(VOCABULARY, MEANING);
    expect(grtRes1).toEqual([ false, MEANING ])
    expect(grtRes2).toEqual([ false, READING ])
  });
  
  // ****
  test('getReviewType should work no previous selection - vocab', () => {
    const grtRes = getReviewType(VOCABULARY, null);
    expect([[ true, MEANING ], [ true, READING ]]).toContainEqual(grtRes)
  });

});