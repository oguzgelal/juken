import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Toast, { DURATION as _DURATION } from 'react-native-easy-toast';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

export const DURATION = _DURATION;
export const TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
};

const ToastComponent = React.forwardRef(({ type, style, styleText }, ref) => {

  return (
    <Toast
      ref={ref}
      textStyle={[
        styles.styleText,
        type === TYPES.ERROR && styles.textError,
        type === TYPES.SUCCESS && styles.textSuccess,
        type === TYPES.WARNING && styles.textWarning,
        styleText,
      ]}
      style={[
        styles.wrapper,
        type === TYPES.ERROR && styles.error,
        type === TYPES.SUCCESS && styles.success,
        type === TYPES.WARNING && styles.warning,
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
  ]),
};

const styles = StyleSheet.create({
  wrapper: sheet({
    base: {
      borderRadius: 8,
    },
    // positioning fix for
    // web environments
    web: {
      position: 'fixed',
      bottom: '8%'
    }
  }),
  styleText: {
    fontWeight: '500',
    color: theme.palette.white,
  },
  error: { backgroundColor: theme.palette.red },
  success: { backgroundColor: theme.palette.green },
  warning: { backgroundColor: theme.palette.yellow },
  textError: { color: 'rgba(0, 0, 0, .4)' },
  textSuccess: { color: 'rgba(0, 0, 0, .6)' },
  textWarning: { color: 'rgba(0, 0, 0, .6)' },
})

export default ToastComponent;
