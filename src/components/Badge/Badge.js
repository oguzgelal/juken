import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'src/common/theme';

const Badge = ({ style, text, icon }) => {
  const hasBoth = !!icon && !!text;
  return (
    <View style={[ style, styles.wrapper ]}>
      {!!icon && <View style={styles.icon}>{icon}</View>}
      {!!text && <Text style={[ styles.text, hasBoth ? styles.textHasIcon : {} ]}>{text}</Text>}
    </View>
  )
};

Badge.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  icon: PropTypes.any,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 250,
    paddingLeft: 4,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    color: theme.palette.white,
    marginLeft: 4,
  },
  textHasIcon: {
    marginLeft: 3,
    marginRight: 2,
  },
  icon: {
    marginLeft: 4,
  },
})

export default Badge;
