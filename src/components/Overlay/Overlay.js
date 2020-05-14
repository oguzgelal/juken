import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal } from 'react-native';
import device from 'src/utils/device';

const Overlay = ({
  children,
  style,
  visible,
} = {}) => (
  <Modal
    transparent
    visible={visible}
    style={[
      style,
      styles.wrapper,
    ]}
  >
    {children}
  </Modal>
);

Overlay.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: device({
    base: {
      top: 0,
      left: 0,
      zIndex: 999,
      width: '100%',
      height: '100%',
    },
    web: {
      position: 'fixed',
      border: 'none',
      borderColor: 'black',
    },
    mobile: {
      position: 'absolute',
    }
  })
})

export default Overlay;
