import moment from 'moment';
import get from 'lodash/get';
import storage from 'src/models/storage';
import shouldFetch from 'src/utils/shouldFetch';

const DATA = 'data';
const LAST_FETCHED = 'last_fetched';

class Resource {
  
  key(resource, ids) {
    const err = 'Resources must have a name';
    if (!get(resource, 'name')) throw new Error(err);
    const arr = Array.isArray(ids) ? ids : [ids];
    return [resource.name, arr].flat().filter(Boolean).join('_');
  }

  // return a function that accepts a fetcher function and returns a promise.
  // fetcher function should return a promise that resolves with fetched data
  // unmodified. this function will first try to grab the resource from local
  // storage, and based on the cache situation, either return the value cached
  // in local storage without calling the fetcher function; or will call the
  // fetcher function, cache the results (based on resource configuration), and
  // resolve with the fetched data.

  // usage:
  // resource.get('wk_api_key')().then(res => /* ... */)
  // resource.get('subject', '123')(() => <fetch_fn>()).then(res => /* ... */)

  get(resource, ids) {
    return fetchFn => new Promise(async (resolve, reject) => {
      try {
        const key = this.key(resource, ids);
        const stored = await storage.get(key) || {};
        const shouldFetchResource = shouldFetch(
          resource,
          stored[DATA],
          stored[LAST_FETCHED],
        );

        // if there is no need to fetch the resource,
        // resolve with what we have (may be undefined)
        if (!shouldFetchResource) {
          resolve(stored[DATA]);
          return;
        }

        // no fetch fn provided, resolve with null
        if (typeof fetchFn !== 'function') {
          resolve(null);
          return;
        }

        // call fetch function
        fetchFn()
          .then(async res => {
            // if cache is truthy, cache the result
            if (resource.cache) {
              await this.save(resource, ids, res);
            }
            resolve(res);
            return;
          })
          .catch(reject);

      } catch(e) {
        reject(e);
      }
    })
  }

  save(resource, ids, data) {
    const key = this.key(resource, ids);
    return storage.set(key, {
      [LAST_FETCHED]: moment().toISOString(),
      [DATA]: data,
    });
  }
}

export default new Resource();