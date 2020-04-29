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

}

export default new Request();