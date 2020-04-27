import storage from 'src/models/storage';
import request, { POST, PUT, GET, DELETE } from 'src/models/request';
import { WK_API_KEY } from 'src/common/constants';

class Api {

  constructor() {
    this.debug = true;
    this.base = 'https://api.wanikani.com/v2/';
    this.err_nokey = 'Error: Api key not found.'
  }

  resolveError(msg, err) {
    return this.debug ? err : msg;
  }

  req({ resolve, reject, method, endpoint, params, headers }) {
    request.send(method, `${this.base}${endpoint}`, headers).then(res => {
      console.log('>', res);
      resolve(res);
    })
  }

  get(...args) { this.send(GET, ...args) }
  post(...args) { this.send(POST, ...args) }
  put(...args) { this.send(PUT, ...args) }
  delete(...args) { this.send(DELETE, ...args) }
  
  send(method, endpoint, params) {
    return new Promise((resolve, reject) => {
      // fetch api key every time
      storage.get(WK_API_KEY).then(apiKey => {
        // default headers
        const headers = { Authorization: `Bearer ${apiKey}` }
        // make request
        this.req({ resolve, reject, method, endpoint, params, headers })
      })
    })
  }

  login(apiKey) {
  }
}

export default new Api();