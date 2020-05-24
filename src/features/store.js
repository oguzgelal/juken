import { createStore, persist } from 'easy-peasy';
import { loadings } from 'src/features/request/models';
import { session } from 'src/features/wk/models';
import { reviews } from 'src/features/reviews/models';

import { AsyncStorage } from 'react-native';
import localForage from 'localforage';
import device from 'src/utils/device';

const models = {
  session,
  loadings,
  reviews,
};

const persisted = persist(models, {
  storage: device('mobile')
    ? AsyncStorage
    : localForage,
  whitelist: [
    'session'
  ]
});

export default createStore(persisted, {
  name: 'JukenStore'   
});
