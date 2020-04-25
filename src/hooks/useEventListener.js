import { useEffect } from 'react';

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
      if (typeof handler === 'function') {
        handler(...args);
      }
    }
    
    // attach event listener
    el.addEventListener(event, handlerFunction);
    
    return () => {
      
      // detach event listener
      el.removeEventListener(event, handlerFunction);

    }
  }, triggers)
}