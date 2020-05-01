import RequestWk from 'src/models/requestWk';
import storage from 'src/models/storage';
import resource from 'src/models/resource';
import resources from 'src/common/resources';
import { WK_API_KEY } from 'src/common/storageKeys';

class WK {

  constructor() {
    this.req = new RequestWk();
  }
  
  // login with wk api key
  // use get user request as a way to validate api key
  // bonus: save the id, username and start date
  login(apiKey) {
    return this.req.get('user', { apiKey, loadingKey: 'login' })
      .then(res => {
        const userId = get(res, 'data.id');
        resource.save(resources.USER, userId, res);
        storage.set(WK_API_KEY, apiKey);
        resolve(res);
      });
  }

  // logout, clear api key from storage
  logout() {
    CLEAR_ON_LOGOUT.map(key => {
      storage.set(key, null);
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