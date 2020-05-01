// TODO: AsyncStorage from community work work:
// [@RNC/AsyncStorage]: NativeModule: AsyncStorage is null.
// AsyncStorage is slated to be removed from React Native,
// find a different storage solution that works before it
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import localForage from 'localforage';
import MockStorage from 'src/utils/test/MockStorage';
import isJestRunning from 'src/utils/test/isJestRunning';
import { useState, useEffect } from 'react';
import isNil from 'lodash/isNil';
import os from 'src/utils/os';

class Storage {

  constructor() {
    this.debug = true;
    this.prefix = 'WANIANKI';
    this.listeners = {};
    this.err_serialize = 'Storage Error: Failed to persist data due to possible data corruption';
    this.err_deserialize = 'Storage Error: Failed due to corruption in persisted data';
    this.err_set = 'Storage Error: Failed to persist data';
    this.err_get = 'Storage Error: Failed to retrieve persisted data';
  }

  // AsyncStorage doesn't work on jest for mobile
  // environments, so create a mock for tests
  getMobileStorage() {
    return isJestRunning() ? MockStorage : AsyncStorage
  }

  // function to attach a listener for a specific key
  addListener(k, callback) {
    const key = this.generateKey(k);
    // create a signature to identify the function
    // while removing the listener 
    const signature = Math.round(Math.random() * 100000000);
    // initiate and push the callback
    if (!this.listeners[key]) this.listeners[key] = {};
    this.listeners[key][signature] = callback;
    // return a function that removes the registered listener
    return () => {
      this._removeListener(k, signature)
    };
  }

  // function to remove a single listener with key and signature
  _removeListener(k, signature) {
    const key = this.generateKey(k);
    if (this.listeners[key] && this.listeners[key][signature]) {
      this.listeners[key][signature] = null;
      delete this.listeners[key][signature];
    }
  }

  // remove all listeners under a key
  removeAllListeners(k) {
    const key = this.generateKey(k);
    this.listeners[key] = null;
    delete this.listeners[key];
  }

  // trigger listeners on a key with a value
  triggerListeners(k) {
    const key = this.generateKey(k);
    if (this.listeners[key] && typeof this.listeners[key] === 'object') {
      // fetch the value from storage just
      // to make sure it was stored properly
      this.get(k).then(value => {
        // loop through all listeners attached to a key
        Object.values(this.listeners[key]).forEach(fn => {
          // invoke the listener with the value
          if (typeof fn === 'function') fn(value)
        })
      })
    }
  }

  generateKey(key) {
    return `${this.prefix}_${key}`;
  }

  resolveError(msg, err) {
    return this.debug ? err : msg;
  }

  serializeValue(value, errCallback) {
    try {
      return JSON.stringify({ value })
    } catch(e) {
      errCallback(
        this.resolveError(this.err_serialize, e)
      )
    }
  }

  parseValue(value, errCallback) {
    try {
      return JSON.parse(value);
    } catch(e) {
      errCallback(
        this.resolveError(this.err_serialize, e)
      )
    }
  }

  set(k, v) {
    return new Promise((resolve, reject) => {
      try {
        const key = this.generateKey(k);
        const value = this.serializeValue(v, reject);

        // use localforage for web environments
        if (os('desktop')) {
          localForage.setItem(key, value, err => {
            this.setResolve(resolve, reject, k, err);
          });
        }

        // use async storage for mobile
        if (os('mobile')) {
          const Storage = this.getMobileStorage();
          Storage.setItem(key, value, err => {
            this.setResolve(resolve, reject, k, err);
          })
        }
      } catch(e) {
        reject(this.resolveError(this.err_set, e))
      }
    })
  }

  // control set response
  setResolve(resolve, reject, k, err) {
    if (isNil(err)) {
      // if there are listeners for a particular key,
      // trigger them with the saved value
      this.triggerListeners(k);
      // resolve
      this.get(k).then(resolve).catch(reject)
    } else {
      reject(this.resolveError(this.err_set, err));
    }
  }

  get(k) {
    return new Promise((resolve, reject) => {
      try {
        const key = this.generateKey(k);

        // use localforage for web environments
        if (os('desktop')) {
          localForage.getItem(key, (err, result) => {
            return this.getResolve(resolve, reject, err, result)
          })
        }

        // use async storage for mobile
        if (os('mobile')) {
          const Storage = this.getMobileStorage();
          Storage.getItem(key, (err, result) => {
            return this.getResolve(resolve, reject, err, result)
          })
        }

      } catch(e) {
        reject(this.resolveError(this.err_get, e))
      }
    })
  }

  getResolve(resolve, reject, err, result) {
    if (!isNil(err)) {
      reject(this.resolveError(this.err_get, err));
    } else {
      if (!result) { resolve(null); return; }
      const parsed = this.parseValue(result, reject);
      const value = parsed.value;
      resolve(value)
    }
  }
}

// instantiate the storage
const storageInstance = new Storage();

// hook that to register / deregister a listener for
// changes in storage with a particular key
export const useListener = (k, callback) => {
  // keep a loading state
  const [ fetching, setFetching ] = useState(true);
  useEffect(() => {
    // attach listener
    const removeListener = storageInstance.addListener(k, callback);
    // receive the value and trigger 
    // the callback manually on mount
    storageInstance.get(k).then(val => {
      setFetching(false);
      if (typeof callback === 'function') {
        callback(val);
      }
    })
    // detach listener on unmount
    return () => {
      removeListener();
    }
  }, []);
  return fetching;
}

// hook that fetch a value with a key from the store
// on mount or with triggers 
export const useStoredValue = k => {
  // create a state variable to store the value
  const [ val, setVal ] = useState(null);
  // register a listener to keep the value updated
  const fetching = useListener(k, newVal => setVal(newVal));
  // return the value and its fetching state
  return [val, fetching]
}

// default export the storage instance
export default storageInstance;