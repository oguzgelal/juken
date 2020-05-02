// a generic loading state hook that could be used
// with anything that returns a promise

import { useState, useEffect } from 'react';

export default (fn, { immediate, onSuccess, onError } = {}) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ response, setResponse ] = useState(null);

  const trigger = () => {
    
    // make sure function is valid
    if (typeof fn !== 'function') {
      setLoading(false);
      setError('Invalid function provided');
      return;
    }

    // execute function
    const fnReturn = fn();

    // make sure function returns a promise
    if (!(fnReturn instanceof Promise)) {
      setLoading(false);
      setError('Provided function does not return a Promise');
      return;
    }
    
    // set loading err and response
    fnReturn
      .then(res => {
        setLoading(false);
        setResponse(res);
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err);
        if (typeof onError === 'function') {
          onError(err);
        }
      })
  }

  // option to trigger the request immediately
  useEffect(() => {
    if (immediate) {
      trigger();
    }
  }, [])

  return [
    trigger,
    loading,
    response,
    error,
  ];
}