import AsyncStorage from '@react-native-community/async-storage'
import localForage from 'localforage';
import { createStore, persist } from 'easy-peasy';
import { loadings } from 'src/features/request/models';
import { session } from 'src/features/wk/models';
import { reviews } from 'src/features/reviews/models';
import device from 'src/utils/device';

const asyncStorage = {
  async getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key))
  },
  setItem(key, data) {
    AsyncStorage.setItem(key, JSON.stringify(data))
  },
  removeItem(key) {
    AsyncStorage.removeItem(key)
  }
}

const models = {
  session,
  loadings,
  reviews,
};

const persisted = persist(models, {
  storage: device('mobile')
    ? asyncStorage
    : localForage,
  whitelist: [
    'session'
  ]
});

export default createStore(persisted, {
  name: 'JukenStore'   
});
