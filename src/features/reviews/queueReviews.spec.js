import queueReviews from 'src/features/reviews/queueReviews';

describe('queueReviews', () => {

  // ****
  test('reviews should work with empty array', () => {
    const queue = queueReviews([])
    expect(queue).toEqual([]);
  });

});