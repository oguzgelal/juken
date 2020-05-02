import RequestWk from 'src/models/requestWk';
import resource, { r } from 'src/models/resource';

class WK {

  constructor() {
    this.req = new RequestWk();
  }
  
  // use get user request as a way to validate api key
  // bonus: save the id, username and start date
  login(apiKey) {
    return resource.get(r.WK_API_KEY)(() => {
      return new Promise((resolve, reject) => {
        this.req.get('user', { apiKey, loadingKey: 'login' })
          .then(res => {
            // TODO
            console.log('res', res);
            resolve(res);
            // const userId = get(res, 'data.')
          })
          .catch(reject);
      }) 
    });
  }

  logout() {
    return resource.clearResources((name, _) => {
      const resRemove = r[name];
      return !resRemove.persistOnLogout;
    })
  }

  loadReviews() {
    const params = { immediately_available_for_review: true };
    return this.req.get('assignments', { params, loadingKey: 'reviews' })
      .then(res => {
        console.log('reviews', res);
      })
  }
}

export default new WK();