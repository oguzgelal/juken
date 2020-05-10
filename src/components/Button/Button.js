import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as sharedStyles from 'src/components/Button/sharedStyles';

const Button = ({ iconLeft, iconRight, text, onPress, style, textStyle }) => (
  <View style={[styles.wrapper, style ]}>
    <TouchableOpacity onPress={onPress} style={{ height: '100%' }}>
      <View style={styles.container}>
        {!!iconLeft && <View style={[ styles.icon, { left: 12 }]}>{iconLeft}</View>}
        <Text style={[ styles.text, textStyle ]}>{text}</Text>
        {!!iconRight && <View style={[ styles.icon,  { right: 12 }]}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  </View>
);

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
  container: sharedStyles.container,
  text: sharedStyles.text,
  icon: { position: 'absolute', paddingTop: 4 }
})

export default Button;
