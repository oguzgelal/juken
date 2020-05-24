import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreRehydrated } from 'easy-peasy';
import _ from 'lodash';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
import Message from 'src/screens/Message/Message';
import initEvents from 'src/features/events/initEvents';
import logEvent from 'src/features/events/logEvent';
import setUserAnalytics from 'src/features/events/setUserAnalytics';

export default () => {

  const rehydrated = useStoreRehydrated();
  const user = useStoreState(s => s.session.user);
  const token = useStoreState(s => s.session.token);

  const [ demo, setDemo ] = useState(false);
  const [ appleDemo, setAppleDemo ] = useState(false);

  useEffect(() => {
    initEvents();

    // identify and log
    // user if logged in
    if (user) {
      setUserAnalytics(user, () => {
        logEvent('juken_Load', {
          user: _.get(user, 'data.username')
        })
      });
    } else {
      logEvent('juken_Load')
    }
  }, [])

  // store being rehydrated
  if (!rehydrated) {
    return (
      <Message loading />
    )
  }

  // demo mode
  if (demo) {
    return (
      <Review
        demo
        appleDemo={appleDemo}
        stopDemo={() => {
          setDemo(false);
          setAppleDemo(false);
        }}
      />
    );
  }

  // not logged in
  if (!token) {
    return (
      <Login
        startDemo={apple => {
          if (apple) setAppleDemo(true);
          setDemo(true)
        }}
      />
    );
  }

  // logged in
  return <Review />;
};
