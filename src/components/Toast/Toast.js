import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Toast, { DURATION as _DURATION } from 'react-native-easy-toast';
import device from 'src/utils/device';
import theme from 'src/common/theme';
import {
  APPRENTICE,
  GURU,
  MASTER,
  ENLIGHTENED,
  BURNED,
} from 'src/common/constants';

export const DURATION = _DURATION;
export const TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
};

const ToastComponent = React.forwardRef(({
  type,
  style,
  styleText,
  position
}, ref) => {

  return (
    <Toast
      ref={ref}
      position={position}
      textStyle={[
        styles.styleText,
        type === TYPES.ERROR && styles.textError,
        type === TYPES.SUCCESS && styles.textSuccess,
        type === TYPES.WARNING && styles.textWarning,
        type === APPRENTICE && styles.textWhite,
        type === GURU && styles.textWhite,
        type === MASTER && styles.textWhite,
        type === ENLIGHTENED && styles.textWhite,
        type === BURNED && styles.textWhite,
        styleText,
      ]}
      style={[
        styles.wrapper,
        position === 'top' && styles.webTop,
        position !== 'top' && styles.webBottom,
        type === TYPES.ERROR && styles.error,
        type === TYPES.SUCCESS && styles.success,
        type === TYPES.WARNING && styles.warning,
        type === APPRENTICE && styles[APPRENTICE],
        type === GURU && styles[GURU],
        type === MASTER && styles[MASTER],
        type === ENLIGHTENED && styles[ENLIGHTENED],
        type === BURNED && styles[BURNED],
        style,
      ].filter(Boolean)}
    />
  )
});

ToastComponent.propTypes = {
  style: PropTypes.object,
  styleText: PropTypes.object,
  type: PropTypes.oneOf([
    TYPES.ERROR,
    TYPES.SUCCESS,
    TYPES.WARNING,
    TYPES.INFO,
    APPRENTICE,
    GURU,
    MASTER,
    ENLIGHTENED,
    BURNED,
  ]),
};

const styles = StyleSheet.create({
  wrapper: device({
    base: {
      borderRadius: 8,
    },
    // positioning fix for
    // web environments
    web: {
      position: 'fixed',
    }
  }),
  webTop: device({
    web: { top: '18%' }
  }),
  webBottom: device({
    web: { bottom: '8%' }
  }),
  styleText: {
    fontWeight: '500',
    color: theme.palette.white,
  },

  error: { backgroundColor: theme.palette.red },
  success: { backgroundColor: theme.palette.green },
  warning: { backgroundColor: theme.palette.yellow },
  [APPRENTICE]: { backgroundColor: theme.color.apprentice },
  [GURU]: { backgroundColor: theme.color.guru },
  [MASTER]: { backgroundColor: theme.color.master },
  [ENLIGHTENED]: { backgroundColor: theme.color.enlightened },
  [BURNED]: { backgroundColor: theme.color.burned },
  
  textError: { color: 'rgba(0, 0, 0, .4)' },
  textSuccess: { color: 'rgba(0, 0, 0, .6)' },
  textWarning: { color: 'rgba(0, 0, 0, .6)' },
  textWhite: { color: theme.palette.white }
})

export default ToastComponent;
