import moment from 'moment';
import isNil from 'lodash/isNil';

export default (
  resource,
  lastFetchedData,
  lastFetchedTime,
) => {

  // there is no stored data, should fetch
  if (isNil(lastFetchedData)) return true;

  const { cache, cacheUnit } = resource;

  // if cache is false, it means this resource
  // is not meant to be cached. so it's safe to 
  // treat this resource as if cache was expired
  if (cache === false) return true;

  // if cache is true, this resource is meant to
  // be cached indefinitely. hence, cache is not expired
  else if (cache === true) return false;

  // cache is not a boolean and not a number,
  // omitting cache is equivalted to `false`
  else if (!Number.isInteger(cache)) return true;

  // check expiration
  else {

    // convert now and then into unix timestamp
    const nowUnix = moment().unix();
    const lastFetchedUnix = moment(lastFetchedTime).unix();

    // no valid fetch date, fetch again
    if (isNaN(lastFetchedUnix)) return true;

    // seconds passed since last fetch
    const timePassedSeconds = nowUnix - lastFetchedUnix;

    // cache time in seconds
    let cacheTimeSeconds = cache;
    if (cacheUnit === 'minutes') cacheTimeSeconds *= 60;
    if (cacheUnit === 'hours') cacheTimeSeconds *= 3600;
    if (cacheUnit === 'day') cacheTimeSeconds *= 86400;

    // if allowed gap time is larger than time passed
    // then cache is expired, so fetch again
    return timePassedSeconds > cacheTimeSeconds;
  }
}