import React, { useState } from 'react';
import { select } from 'src/features/wk/state';
import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';

export default () => {

  const apiKey = select(r => r.API_KEY);
  const [ demo, setDemo ] = useState(false);

  if (demo) return <Review demo stopDemo={() => setDemo(false)} />;

  if (!apiKey) return <Login startDemo={() => setDemo(true)} />;

  return <Review />;
};
