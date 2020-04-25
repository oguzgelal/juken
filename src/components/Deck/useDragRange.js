import { useMemo } from 'react';
import os from "src/utils/os";

export default windowWidth => {
  return useMemo(() => {
    return os("mobile") ? windowWidth / 3 : 180
  }, [windowWidth]);
}