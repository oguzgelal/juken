import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';
import theme from 'src/common/theme';
import useColorScheme from 'src/hooks/useColorScheme';

const TextInputComponent = ({ style, ...props } = {}) => {
  const colorScheme = useColorScheme();
  return <TextInput
    style={[
      styles.wrapper,
      colorScheme === "light" ? null : styles.wrapper_dark,
      ...(Array.isArray(style) ? style : [style])
    ]}
    {...props}
  />
};

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
  },
  wrapper_dark: {
    backgroundColor: theme.palette_dark.gray,
    color: theme.palette_dark.white
  }
})

export default TextInputComponent;
