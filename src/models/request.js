import * as env from 'src/common/env';
import queryString from 'src/utils/queryString';
export const POST = 'POST';
export const PUT = 'PUT';
export const GET = 'GET';
export const DELETE = 'DELETE';

class Request {

  send(method, url, { body = {}, params = {}, headers } = {}) {
    return new Promise((resolve, reject) => {
      
      // construct url
      const finalUrl = `${url}${queryString(params)}`;

      // construct options
      const opts = { method, headers };
      if (body && method !== GET) opts.body = JSON.stringify(body);

      // log
      if (env.DEBUG) {
        console.log(`🌎 [${method}]: `, finalUrl, opts);
      }
      
      // make the request
      fetch(finalUrl, opts)
        .then(response => response.json())
        .then(res => {
          if (env.DEBUG) console.log(`🚨 [${method}]: `, finalUrl, res);
          resolve(res);
        })
        .catch(err => {
          if (env.DEBUG) console.log(`🚨 [${method}]: `, finalUrl, err);
          reject(err);
        })
    })
  }

}

export default new Request();