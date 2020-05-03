import { useEffect } from 'react';
import run from 'src/utils/run';

export default ({ el, event, handler }, triggers) => {
  useEffect(() => {
    
    if (
      !el ||
      !event ||
      typeof el.addEventListener !== 'function' ||
      typeof el.removeEventListener !== 'function'
    ) {
      return () => {};
    }

    // create named function
    const handlerFunction = (...args) => {
      run(handler, ...args);
    }
    
    // attach event listener
    el.addEventListener(event, handlerFunction);
    
    return () => {
      
      // detach event listener
      el.removeEventListener(event, handlerFunction);

    }
  }, triggers)
}