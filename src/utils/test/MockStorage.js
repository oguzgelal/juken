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
}

export default new MockStorage();