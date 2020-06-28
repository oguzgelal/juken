import { useEffect } from 'react';
import device from 'src/utils/device';

export default () => {
  useEffect(() => {

    if (device('web')) {

      // no warnings on development mode
      const loc = window.location.href || '';
      if (loc.indexOf('localhost')) return;

      window.onbeforeunload = () => {
        return (
          'Unfinished reviews will be lost, ' +
          'are you sure you want to proceed ?'
        );
      }
    }
    
    return () => {
      if (device('web')) {
        window.onbeforeunload = null;
      }
    }
  });
}