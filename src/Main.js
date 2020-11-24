import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreRehydrated } from 'easy-peasy';
import _ from 'lodash';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';
import Message from 'src/screens/Message/Message';

export default () => {

  const rehydrated = useStoreRehydrated();
  const token = useStoreState(state => state.session.token);

  const [ demo, setDemo ] = useState(false);

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
        stopDemo={() => {
          setDemo(false);
        }}
      />
    );
  }

  // not logged in
  if (!token) {
    return (
      <Login
        startDemo={() => {
          setDemo(true)
        }}
      />
    );
  }

  // logged in
  return <Review />;
};
