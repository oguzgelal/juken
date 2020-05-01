import isNil from 'lodash/isNil';

export default params => {
  if (!params) return '';

  const qs = Object.entries(params)
    .filter(pair => pair[1] !== undefined)
    .map(pair => pair
      .filter(i => !isNil(i))
      .map(encodeURIComponent)
      .join('=')
    )
    .join('&');

  return qs && '?' + qs;
}