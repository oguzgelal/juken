import { useState, useEffect } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import storage from 'src/models/storage';
import shouldFetch from 'src/utils/shouldFetch';

export const DELIM = '_@_';
const DATA = 'data';
const LAST_FETCHED = 'last_fetched';
const LOADING_START = 'start';
const LOADING_END = 'end';

class Resource {

  constructor() {
    this.loadings = {};
    this.loadingListeners = {};
  }
  
  key(resource, ids) {
    const err = 'Resources must have a name';
    if (!get(resource, 'name')) throw new Error(err);
    const arr = Array.isArray(ids) ? ids : [ids];
    const delimRegex = new RegExp(DELIM, 'gi');
    return [resource.name, arr]
      .flat()
      .filter(Boolean)
      .map(k => k.replace(delimRegex, '___'))
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
        // start loadings
        this._loadingStart(resource, ids);
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
          this._loadingEnd(resource, ids);
          resolve(stored[DATA]);
          return;
        }

        // no valid fetch fn provided, resolve with null
        if (typeof fetchFn !== 'function') {
          this._loadingEnd(resource, ids);
          resolve(null);
          return;
        }

        // call fetch function
        fetchFn()
          .then(async res => {
            // cache response
            await this.cache(resource, ids)(res);
            // end loading and resolve
            this._loadingEnd(resource, ids);
            resolve(res);
            return;
          })
          .catch(err => {
            this._loadingEnd(resource, ids);
            reject(err);
          });

      } catch(e) {
        this._loadingEnd(resource, ids);
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
              const resName = keyParts.slice(0, 1);
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


  // trigger listeners for loading start
  _triggerLoadingListeners(resource, ids) {
    const key = this.key(resource, ids);
    return type => {
      // update this.loadings
      if (type === LOADING_START) this.loadings[key] = true;
      if (type === LOADING_END) this.loadings[key] = false;
      // trigger listener callbacks
      const listeners = this.loadingListeners[key] || {};
      if (typeof listeners[type] === 'function') listeners[type]();
    }
  }

  _loadingStart(resource, ids) {
    this._triggerLoadingListeners(resource, ids)(LOADING_START);
  }
  
  _loadingEnd(resource, ids) {
    this._triggerLoadingListeners(resource, ids)(LOADING_END);
  }

  _registerLoadingListeners(resource, ids) {
    const key = this.key(resource, ids);
    return (start, end) => {
      this.loadingListeners[key] = {
        [LOADING_START]: start,
        [LOADING_END]: end,
      };
    }
  }

  _removeLoadingListeners(resource, ids) {
    const key = this.key(resource, ids);
    return () => {
      this.loadingListeners[key] = null;
      delete this.loadingListeners[key];
    }
  }

  // ---- HOOKS ----

  // hook that registers callbacks on mount for loading
  // start / end, and removes them on unmount
  _useLoadings(resource, ids) {
    return (start, end) => {
      useEffect(() => {
        this._registerLoadingListeners(resource, ids)(start, end);
        return () => {
          this._removeLoadingListeners(resource, ids)();
        }
      }, []);
    }
  }

  // this hook retrieves resource and provides a loading state.
  // this loading indicates the time it takes from a resource
  // being requested to the time it is produced; whether it was
  // retrieved from cache, or fetched, or re-fetched and cached
  useResource(resource, ids) {
    return fetchFn => {
      
      // keep resource and loading in a state
      const key = useMemo(() => this.key(resource, ids), [resource, ids]);
      const [ result, setResult ] = useState(null);
      const [ loading, setLoading ] = useState(this.loadings[key]);
      const [ error, setError ] = useState(null);

      useEffect(() => {
        
        // register listener
        this._useLoadings(resource, ids)(
          () => setLoading(true),
          () => setLoading(false)
        );

        // retrieve the resout
        this.get(resource, ids)(fetchFn)
          .then(res => { setResult(res); })
          .catch(err => { setError(err); })
      }, [resource, ids])

      // return result and loading / error states
      return [
        result,
        loading,
        error,
      ];
    }
  }

}

export default new Resource();