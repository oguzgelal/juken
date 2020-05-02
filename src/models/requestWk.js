// wanikani client
import { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import * as env from 'src/common/env';
import * as rs from 'src/common/resources';
import resource from 'src/models/resource';
import request, { POST, PUT, GET, DELETE } from 'src/models/request';

const LOADING_START = 'start';
const LOADING_END = 'end';

class RequestWk {

  constructor() {
    this.base = 'https://api.wanikani.com/v2/';
    this.loadings = {};
    this.loadingListeners = {};
    this.err_nokey = 'Error: Api key not found.';
    this.err_invalidkey = 'Error: Invalid API Key';
    this.err_reviewsloadfail = 'Error: Cannot load reviews';
  }

  resolveError(msg, err) {
    if (!err) return msg;
    return env.DEBUG ? err : msg;
  }

  resolveResponse(res, { resolve, reject }) {
    let err = null;

    if (res.code === 401) err = this.err_invalidkey;

    if (err) {
      const resolve = this.resolveError(err);
      if (typeof reject === 'function') reject(resolve);
      return resolve;
    } else {
      if (typeof resolve === 'function') resolve(res);
      return res;
    }
  }

  get(...args) { return this.send(GET, ...args) }
  post(...args) { return this.send(POST, ...args) }
  put(...args) { return this.send(PUT, ...args) }
  delete(...args) { return this.send(DELETE, ...args) }

  // trigger listeners for loading start
  triggerLoadingListeners(type, key) {
    if (isNil(key)) return;
    const keys = Array.isArray(key) ? key : [key];
    keys.forEach(k => {
      // update this.loadings
      if (type === LOADING_START) this.loadings[k] = true;
      if (type === LOADING_END) this.loadings[k] = false;
      // trigger listener callbacks
      const listeners = this.loadingListeners[k] || {};
      if (typeof listeners[type] === 'function') listeners[type]();
    })
  }

  loadingStart(key) { this.triggerLoadingListeners(LOADING_START, key); }
  loadingEnd(key) { this.triggerLoadingListeners(LOADING_END, key); }
  
  async send(method, endpoint, { body, params, apiKey, loadingKey } = {}) {
    // fetch api key or use provided
    const useApiKey = apiKey || await resource.get(rs.WK_API_KEY)();
    // return promise
    return new Promise((resolve, reject) => {
      // default headers
      const headers = { Authorization: `Bearer ${useApiKey}` }
      // start loadings
      this.loadingStart(loadingKey);
      // make request
      request
        .send(method, `${this.base}${endpoint}`, {
          body,
          params,
          headers,
        })
        .then(res => {
          this.loadingEnd(loadingKey);
          this.resolveResponse(res, { resolve, reject });
          return;
        })
        .catch(err => {
          this.loadingEnd(loadingKey);
          reject(this.resolveError(err, err));
          return;
        })
    })
  }

  // a bit lower level hook that registers callbacks
  // for loading start / end on a particular request
  useLoadings(key, start, end) {
    useEffect(() => {
      this.loadingListeners[key] = {
        [LOADING_START]: start,
        [LOADING_END]: end,
      };
      return () => {
        this.loadingListeners[key] = null;
        delete this.loadingListeners[key];
      }
    }, []);
  }

  // hook that lets you know if a certain
  // request is running or not
  isLoading(key) {
    const [ loading, set ] = useState(this.loadings[key]);
    this.useLoadings(key, () => set(true), () => set(false));
    return loading;
  }
}

export default RequestWk;