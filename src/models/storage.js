import AsyncStorage from '@react-native-community/async-storage';
import localForage from 'localforage';
import isNil from 'lodash/isNil';
import os from 'src/utils/os';

class Storage {

  constructor() {
    this.debug = true;
    this.prefix = 'WANIANKI';
    this.err_serialize = 'Storage Error: Failed to persist data due to possible data corruption';
    this.err_deserialize = 'Storage Error: Failed due to corruption in persisted data';
    this.err_set = 'Storage Error: Failed to persist data';
    this.err_get = 'Storage Error: Failed to retrieve persisted data';
  }

  generateKey(key) {
    return `${this.prefix}_${key}`;
  }

  resolveError(msg, err) {
    return this.debug ? err : msg;
  }

  serializeValue(value, errCallback) {
    try {
      return JSON.stringify({ value, date: Date.now() })
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
            if (isNil(err)) resolve();
            else reject(this.resolveError(this.err_set, err));
          });
        }

        // use async storage for mobile
        if (os('mobile')) {
          AsyncStorage.setItem(key, value, err => {
            if (isNil(err)) resolve();
            else reject(this.resolveError(this.err_set, err));
          })
        }
      } catch(e) {
        reject(this.resolveError(this.err_set, e))
      }
    })
  }

  get(k) {
    return new Promise((resolve, reject) => {
      try {
        const key = this.generateKey(k);

        // use localforage for web environments
        if (os('desktop')) {
          localForage.getItem(key, (err, result) => {
            if (!isNil(err)) reject(this.resolveError(this.err_get, err));
            else {
              if (!result) { resolve(null); return; }
              const parsed = this.parseValue(result, reject);
              const value = parsed.value;
              resolve(value)
            }
          })
        }

        // use async storage for mobile
        if (os('mobile')) {
          AsyncStorage.getItem(key, (err, result) => {
            if (!isNil(err)) reject(this.resolveError(this.err_get, err));
            else {
              if (!result) { resolve(null); return; }
              const parsed = this.parseValue(result, reject);
              const value = parsed.value;
              resolve(value)
            }
          })
        }

      } catch(e) {
        reject(this.resolveError(this.err_get, e))
      }
    })
  }

}

export default new Storage();