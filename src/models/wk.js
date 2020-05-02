import get from 'lodash/get';
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
            // this is technically supposed to be a "wk_api_key"
            // request, so here we need to resolve with the given
            // api key so the caching mechanism thinks it made a
            // request for wk_api_key and got it, so it can cache
            // it correctly. however we should cache user resource
            // manually
            resource.cache(r.USER)(res);
            resolve(apiKey);
          })
          .catch(reject);
      }) 
    });
  }

  logout() {
    return resource.clearResources((name, _) => {
      const resRemove = r[name];
      if (!resRemove) return true;
      return !resRemove.persistOnLogout;
    })
  }

  loadReviewMaterial() {
    const rParams = { immediately_available_for_review: true };
    return resource.get(r.AVAILABLE_REVIEWS)(() => new Promise((resolve, reject) => {
      this.req.collection('assignments', { params: rParams }).then(reviews => {
        const sParams = { ids: reviews.map(r => get(r, 'data.subject_id')).filter(Boolean).join(',') };
        this.req.collection('subjects', { params: sParams })
          .then(subjects => resolve({ reviews, subjects }))
          .catch(reject)
        })
        .catch(reject)
    }));
  }

  /*
  loadSubjects() {
    return resource.get(r.SUBJECTS_LOADED)(() => {
      return new Promise((resolve, reject) => {
        this.req.collection('subjects').then(subjects => {
          Promise.all(subjects.map(s => (
            resource.cache(r.SUBJECT, s.id)(s)
          ))).then(() => resolve(true)).catch(reject)
        }).catch(reject)
      })
    })
  }
  */

}

export default new WK();