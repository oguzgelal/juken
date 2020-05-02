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

export const AVAILABLE_REVIEWS = {
  name: 'AVAILABLE_REVIEWS',
  cache: false,
}

export const USER = {
  name: 'USER',
  cache: 10,
  cacheUnit: 'days',
};

export const SUBJECT = {
  name: 'SUBJECT',
  cache: 30,
  cacheUnit: 'days',
  persistOnLogout: true,
  persistOnSoftReset: true,
};