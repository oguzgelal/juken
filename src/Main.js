import React from 'react';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';

export default () => {

  const apiKey = select(r => r.API_KEY);

  if (!apiKey) return <Login />;

  return <Review />;
};
