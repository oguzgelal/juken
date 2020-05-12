import { useEffect } from 'react';
import device from 'src/utils/device';

const doTry = (fn) => {
  try { fn(); }
  catch(e) {/* do nothing */}
}

export default () => {
  useEffect(() => {

    if (device('web')) {

      // lock root
      doTry(() => {
        const rootEl = document.getElementById('root');
        rootEl.style.height = '100%';
        rootEl.style.overflow = 'hidden';
      })

      // lock body
      doTry(() => {
        const htmlEl = document.getElementsByTagName('body')[0];
        htmlEl.style.height = '100%';
        htmlEl.style.overflow = 'hidden';
      })

      // lock html
      doTry(() => {
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.style.height = '100%';
        htmlEl.style.overflow = 'hidden';
      })
    }
    
    return () => {
      
      if (device('web')) {
        
        // unlock root
        doTry(() => {
          const rootEl = document.getElementById('root');
          rootEl.style.height = '';
          rootEl.style.overflow = '';
        });

        // unlock body
        doTry(() => {
          const bodyEl = document.getElementsByTagName('body')[0];
          bodyEl.style.height = '';
          bodyEl.style.overflow = '';
        })

        // unlock html
        doTry(() => {
          const htmlEl = document.getElementsByTagName('html')[0];
          htmlEl.style.height = '';
          htmlEl.style.overflow = '';
        });
      }
    }
  });
}