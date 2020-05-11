import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useWkLoading = (...args) => {
  return useWk(...args, { immediate: true })[1];
}

export const useWkFn = (...args) => {
  return useWk(...args)[0];
}

export const useWk = (func, args = {}, { immediate } = {}) => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(immediate ? true : false);

  const _start = () => setLoading(true);
  const _stop = () => setLoading(false);

  // trigger function
  const trigger = (fnArgs = {}) => {
    _start(true);
    dispatch(func({ ...args, ...fnArgs, _start, _stop, }))
  };
  
  // auto-trigger if immediate
  useEffect(() => {
    if (immediate) trigger();
  }, []);
  
  // return [ <loading state>, <function to trigger call> ]
  return [ trigger, loading ];
}