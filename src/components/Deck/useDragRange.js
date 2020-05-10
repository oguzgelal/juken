import { useMemo } from 'react';
import device from "src/utils/device";

export default ({ windowWidth, windowHeight }) => {
  return useMemo(() => {
    return {
      x: device("mobile") ? windowWidth / 3 : 180,
      y: device("mobile") ? windowHeight / 3 : 120,
    }
  }, [
    windowWidth,
    windowHeight
  ]);
}