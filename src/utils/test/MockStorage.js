// AsyncStorage doesn't work on jest for mobile
// environments, so create a mock for tests

class MockStorage {
  constructor() {
    this.mockStore = {};
  }
  
  setItem(key, value, callback) {
    this.mockStore[key] = value;
    setTimeout(callback, 100);
  }
  
  getItem(key, callback) {
    setTimeout(() => {
      callback(null, this.mockStore[key]);
    }, 100);
  }

  getAllKeys(callback) {
    setTimeout(() => {
      callback(null, Object.keys(this.mockStore));
    }, 100);
  }

  clear(callback) {
    this.mockStore = {};
    setTimeout(() => { callback(null); }, 100);
  }

  removeItem(key, callback) {
    delete this.mockStore[key];
    setTimeout(() => { callback(null); }, 100);
  }

  multiRemove(keys = [], callback) {
    (keys || []).forEach(k => { delete this.mockStore[k]; })
    setTimeout(() => { callback(null); }, 100);
  }
}

export default new MockStorage();