import { useMemo } from 'react';
import os from "src/utils/os";

export default ({ windowWidth, windowHeight }) => {
  return useMemo(() => {
    return {
      x: os("mobile") ? windowWidth / 3 : 180,
      y: os("mobile") ? windowHeight / 3 : 120,
    }
  }, [
    windowWidth,
    windowHeight
  ]);
}