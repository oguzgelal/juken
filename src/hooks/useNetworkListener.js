import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import device from 'src/utils/device';

export default () => {
  const [ connected, setConnected ] = useState(true);

  useEffect(() => {

    const webWeAreLive = () => setConnected(true);
    const webWeAreDead = () => setConnected(false);

    // subscribe - web
    if (device('web')) {
      window.addEventListener('online', webWeAreLive);
      window.addEventListener('offline', webWeAreDead);
    }

    // subscribe - mobile
    const mobileUnsubscribe = device('web')
      ? null
      : NetInfo.addEventListener(state => {
        setConnected(state.isInternetReachable);
      });

    return () => {
      // unsubscribe - mobile
      if (mobileUnsubscribe) {
        mobileUnsubscribe();
      }

      // unsubscribe - web
      if (device('web')) {
        window.removeEventListener('online', webWeAreLive);
        window.removeEventListener('offline', webWeAreDead);
      }
    }

  }, [])

  return connected;
}