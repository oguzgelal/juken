import moment from 'moment';
import get from 'lodash/get';
import storage from 'src/models/storage';
import shouldFetch from 'src/utils/shouldFetch';
import * as rs from 'src/common/resources';

export const DELIM = '_@_';
const DATA = 'data';
const LAST_FETCHED = 'last_fetched';

// it's bad practice but for convenience i will
// just export this here, so i can import resource
// instance and resources like this:
// import resource, { r } from 'src/models/resource'
export const r = rs;

class Resource {
  
  key(resource, ids) {
    const err = 'Resources must have a name';
    if (!get(resource, 'name')) throw new Error(err);
    const arr = Array.isArray(ids) ? ids : [ids];
    const delimRegex = new RegExp(DELIM, 'gi');
    return [resource.name, arr]
      .flat()
      .filter(Boolean)
      .map(k => String(k).replace(delimRegex, '___'))
      .join(DELIM);
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
    const key = this.key(resource, ids);
    return fetchFn => new Promise(async (resolve, reject) => {
      try {

        // check cache and decide if re-fetch is needed
        const stored = await storage.get(key);
        const shouldFetchResource = (!stored || !stored[LAST_FETCHED])
          ? true
          : shouldFetch(
            resource,
            stored[DATA],
            stored[LAST_FETCHED],
          );

        // if there is no need to fetch the resource,
        // resolve with what we have (may be empty object)
        if (!shouldFetchResource) {
          resolve(stored[DATA]);
          return;
        }

        // no valid fetch fn provided, resolve with null
        if (typeof fetchFn !== 'function') {
          resolve(null);
          return;
        }

        // call fetch function
        fetchFn()
          .then(async res => {
            // cache response
            await this.cache(resource, ids)(res);
            resolve(res);
            return;
          })
          .catch(err => {
            reject(err);
          });

      } catch(e) {
        reject(e);
      }
    })
  }

  cache(resource, ids) {
    return data => {
      // only cache if `cache` is truthy
      if (!resource.cache) return;
      // generate key
      const key = this.key(resource, ids);
      // write resource into the store with
      // along with last fetch time
      return storage.set(key, {
        [LAST_FETCHED]: moment().toISOString(),
        [DATA]: data,
      }); 
    }
  }

  // clear cached resource
  clearResource(resource, ids) {
    return () => {
      // generate key
      const key = this.key(resource, ids);
      // remove store values
      return storage.removeItem(key);
    }
  }

  // clean multiple resources at once
  // accepts a function that takes the res name and ids
  // as an argument and returns a boolean. not async.
  clearResources(shouldRemove) {
    return new Promise((resolve, reject) => {
      storage
        .getKeys()
        .then(keys => {
          storage.removeItems(
            keys.filter(key => {
              const keyParts = key.split(DELIM);
              const resName = keyParts.slice(0, 1)[0];
              const resIds = keyParts.slice(1);
              return shouldRemove(resName, resIds);
            })
          )
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  useCache(resource, ids) {
    const key = this.key(resource, ids);
    const [ stored, fetching ] = storage.useStoredValue(key);
    return [ get(stored, DATA), fetching ];
  }
}

export default new Resource();