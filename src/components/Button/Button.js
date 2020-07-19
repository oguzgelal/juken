import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as sharedStyles from 'src/components/Button/sharedStyles';
import useColorScheme from 'src/hooks/useColorScheme';;


const Button = ({ iconLeft, iconRight, text, onPress, style, textStyle }) => {
  const colorScheme = useColorScheme();
  return <View style={[styles.wrapper, colorScheme === "light" ? null : styles.wrapper_dark, style ]}>
    <TouchableOpacity onPress={onPress} style={{ height: '100%' }}>
      <View style={styles.container}>
        {!!iconLeft && <View style={[ styles.icon, { left: 12 }]}>{iconLeft}</View>}
        <Text style={[ styles.text,colorScheme === "light" ? null : styles.text_dark, textStyle ]}>{text}</Text>
        {!!iconRight && <View style={[ styles.icon,  { right: 12 }]}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  </View>
};

Button.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
};

const styles = StyleSheet.create({
  wrapper: sharedStyles.wrapper,
  wrapper_dark: sharedStyles.wrapper_darkest,
  container: sharedStyles.container,
  text: sharedStyles.text,
  text_dark: sharedStyles.text_dark,
  icon: { position: 'absolute' }
})

export default Button;
