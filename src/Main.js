import React from 'react';
import { wk } from 'src/redux/wk/slice';
import Review from 'src/screens/Review';
import Login from 'src/screens/Login';

export default () => {

  const apiKey = wk(r => r.API_KEY);

  if (!apiKey) return <Login />;

  return <Review />;
};
