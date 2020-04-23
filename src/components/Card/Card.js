import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import theme from 'src/common/theme';

const Card = ({ children, style = [] }) => (
  <View style={[ styles.wrapper, style ]}>
    {children}
  </View>
);

Card.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.card,
    padding: theme.paddings.u5,
  }
})

export default Card;