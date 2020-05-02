import _ from 'lodash';
import * as env from 'src/common/env';
import resource, { r } from 'src/models/resource';
import request, { POST, PUT, GET, DELETE } from 'src/models/request';

class RequestWk {

  constructor() {
    this.base = 'https://api.wanikani.com/v2/';
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

  // get an entire collection
  _collection(endpoint, options = {}, resolve, reject, col = []) {
    this.get(endpoint, options).then(res => {
      const data = col.concat(_.get(res, 'data') || []);
      const next = _.get(res, 'pages.next_url');
      if (next) {
        options.nextUrl = next;
        this._collection(endpoint, options, resolve, reject, data);
      } else {
        resolve(data);
      }
    }).catch(reject);
  }
  collection(...args) {
    return new Promise(async (resolve, reject) => {
      const [ endpoint, options ] = args;
      this._collection(endpoint, options, resolve, reject);
    });
  }
  
  async send(method, endpoint, { nextUrl, body, params, apiKey } = {}) {
    // fetch api key or use provided
    const useApiKey = apiKey || await resource.get(r.WK_API_KEY)();
    // return promise
    return new Promise((resolve, reject) => {
      // default headers
      const headers = { Authorization: `Bearer ${useApiKey}` }
      // make request
      request
        .send(method, (nextUrl || `${this.base}${endpoint}`), {
          params: nextUrl ? null : params,
          body,
          headers,
        })
        .then(res => {
          this.resolveResponse(res, { resolve, reject });
          return;
        })
        .catch(err => {
          reject(this.resolveError(err, err));
          return;
        })
    })
  }
}

export default RequestWk;