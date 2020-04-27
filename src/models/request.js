export const POST = 'POST';
export const PUT = 'PUT';
export const GET = 'GET';
export const DELETE = 'DELETE';

class Request {

  send(method, url, headers) {
    return new Promise((resolve, reject) => {
      fetch(url, { method, headers })
        .then(response => response.json())
        .then(resolve)
        .catch(reject)
    })
  }

  get(...args) {
    return this.send(GET, ...args);
  }

  post(...args) {
    return this.send(POST, ...args);
  }
  
  put(...args) {
    return this.send(PUT, ...args);
  }
  
  delete(...args) {
    return this.send(DELETE, ...args);
  }

}

export default new Request();