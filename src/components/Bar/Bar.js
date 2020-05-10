import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, Text, View } from 'react-native';

const Bar = ({ style, values = [], colors }) => (
  <View style={[ styles.wrapper, style ]}>
    {values.map((val, i) => (
      <View
        key={`bar-${i}`}
        style={[
          styles.bar,
          {
            width: `${val}%`,
            backgroundColor: colors[i],
          }
        ]}
      />
    ))}
  </View>
);

Bar.propTypes = {
  style: PropTypes.object,
  // percent - [20, 80]
  values: PropTypes.array,
  // ['green', 'red']
  colors: PropTypes.array,
};

const styles = StyleSheet.create({
  wrapper: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  bar: {
    height: '100%',
  }
})

export default Bar;
