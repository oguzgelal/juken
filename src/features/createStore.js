import { createStore } from 'easy-peasy';
import { loadings } from 'src/features/request/models';
import { token, settings, user } from 'src/features/wk/models';

// import { AsyncStorage } from 'react-native';
// import localForage from 'localforage';
// import device from 'src/utils/device';

export default saveStore => {
  const store = createStore({ user, token, settings, loadings })
  saveStore(store);
  return store;
};

