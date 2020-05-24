import { createStore, persist } from 'easy-peasy';
import { loadings } from 'src/features/request/models';
import { session } from 'src/features/wk/models';

import { AsyncStorage } from 'react-native';
import localForage from 'localforage';
import device from 'src/utils/device';

export default saveStore => {

  const models = {
    session,
    loadings,
  };

  const persisted = persist(models, {
    storage: device('mobile')
      ? AsyncStorage
      : localForage,
    whitelist: [
      'session'
    ]
  });

  const store = createStore(persisted, {
    name: 'JukenStore'   
  });
  
  saveStore(store);
  return store;
};

