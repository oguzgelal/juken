import queryString from 'src/utils/queryString';
export const POST = 'POST';
export const PUT = 'PUT';
export const GET = 'GET';
export const DELETE = 'DELETE';

class Request {

  send(method, url, { body = {}, params = {}, headers } = {}) {
    return new Promise((resolve, reject) => {
      const opts = { method, headers };
      if (body && method !== GET) {
        opts.body = JSON.stringify(body)
      }
      fetch(`${url}${queryString(params)}`, opts)
        .then(response => response.json())
        .then(resolve)
        .catch(reject)
    })
  }

}

export default new Request();