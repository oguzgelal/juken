import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const TextInput = props => (
  <View style={styles.wrapper}>
    <Text>Hello</Text>
  </View>
);

TextInput.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default TextInput;
