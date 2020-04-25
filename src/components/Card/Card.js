import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import theme from 'src/common/theme';

const Card = ({ children, style = [], onPress }) => (
  <View
    style={[ styles.wrapper, style ]}
    onClick={onPress}
  >
    {children}
  </View>
);

Card.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.card,
    padding: theme.space.card,
  }
})

export default Card;