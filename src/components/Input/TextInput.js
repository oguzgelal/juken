import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import theme from 'src/common/theme';

const TextInputComponent = ({ style, ...props } = {}) => (
  <TextInput
    style={[
      styles.wrapper,
      ...(Array.isArray(style) ? style : [style])
    ]}
    {...props}
  />
);

TextInputComponent.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  wrapper: {
    height: theme.height.touchable,
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.touchable,
    padding: theme.padding.touchable,
  }
})

export default TextInputComponent;
