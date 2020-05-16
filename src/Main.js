import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';

import initEvents from 'src/features/events/initEvents';
import logEvent from 'src/features/events/logEvent';
import setUserAnalytics from 'src/features/events/setUserAnalytics';

export default () => {

  const apiKey = select(r => r.API_KEY);
  const user = select(r => r.USER);

  const [ demo, setDemo ] = useState(false);

  useEffect(() => {

    initEvents();

    if (user) {
      setUserAnalytics(user, () => {
        logEvent('wanianki_Load', {
          user: _.get(user, 'data.username')
        })
      });
    } else {
      logEvent('wanianki_Load')
    }
    
  }, [])

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
