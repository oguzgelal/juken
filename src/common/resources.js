/**
 * name: String - resource name
 *  - Convention: should be same as the variable name
 * persistOnLogout: Bool - do not clear this on logout
 * persistOnSoftReset: Bool - do not clear this on soft resets
 * cacheUnit: 'seconds', 'minutes', 'hours', 'days' (default: 'seconds')
 * cache: Bool or Number
 *  - true: cache indefinitely
 *  - false: do not cache
 *  - number: cache period (default: hour)
 */

export const WK_API_KEY = {
  name: 'WK_API_KEY',
  cache: true,
}

export const USER = {
  name: 'USER',
  cache: 10,
  cacheUnit: 'days',
};

export const AVAILABLE_REVIEWS = {
  name: 'AVAILABLE_REVIEWS',
  cache: false,
};

// Note: subjects are cached individually
// this resource only holds a boolean value 
// that indicates the subjects were ever
// cached before or not
const s = {
  cache: true,
  persistOnLogout: true,
  persistOnSoftReset: true,
};
export const SUBJECT = { name: 'SUBJECT', ...s };
export const SUBJECTS_LOADED = { name: 'SUBJECTS_LOADED', ...s };
export const SUBJECTS_LAST_FETCHED = { name: 'SUBJECTS_LAST_FETCHED', ...s };