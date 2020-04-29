import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as sharedStyles from 'src/components/Button/sharedStyles';

const Button = ({ text, onPress, style }) => (
  <View style={[styles.wrapper, style ]}>
    <TouchableOpacity onPress={onPress} style={{ height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

Button.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: sharedStyles.wrapper,
  container: sharedStyles.container,
  text: sharedStyles.text,
})

export default Button;
