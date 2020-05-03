import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useWkImmediate = (...args) => {
  return useWk(args[0], args[1], { immediate: true })[1];
}

export const useWkFn = (...args) => {
  return useWk(...args)[0];
}

export const useWkLoading = (...args) => {
  return useWk(...args)[1];
}

export const useWk = (func, args = {}, { immediate } = {}) => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(immediate ? true : false);

  // trigger function
  const trigger = () => {
    setLoading(true);
    dispatch(func({
      ...args,
      _start: () => setLoading(true),
      _stop: () => setLoading(false),
    }))
  };
  
  // auto-trigger if immediate
  useEffect(() => {
    if (immediate) trigger();
  }, []);
  
  // return [ <loading state>, <function to trigger call> ]
  return [ trigger, loading ];
}