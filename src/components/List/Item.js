import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import device from 'src/utils/device';

const Item = ({
  disabled,
  onPress,

  center,
  left,
  right,

  style,
  styleTouchable,
  styleCenter,
  styleLeft,
  styleRight,
}) => (
  <TouchableOpacity
    style={styleTouchable}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={[ styles.wrapper, style ]}>
      
      {/** left */}
      <View style={[ styles.cell, styles.side, styles.left, styleLeft ]}>
        {!!left && left}
      </View>

      {/** center */}
      <View style={[ styles.cell, styles.center, styleCenter ]}>
        {!!center && center}
      </View>

      {/** right */}
      <View style={[ styles.cell, styles.side, styles.right, styleRight ]}>
        {!!right && right}
      </View>

    </View>
  </TouchableOpacity>
);

const styleProps = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array,
]);

Item.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,

  center: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,
  
  style: styleProps,
  styleTouchable: styleProps,
  styleCenter: styleProps,
  styleLeft: styleProps,
  styleRight: styleProps,
};

const styles = StyleSheet.create({
  wrapper: device({
    web: { height: 42 },
    mobile: { height: 52 },
    base: {
      position: 'relative',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 4,
      borderBottomWidth: 1,
      borderBottomColor: 'whitesmoke',
    }
  }),
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  center: { flexGrow: 1 },
  side: { position: 'absolute', zIndex: 1 },
  left: { left: 24 },
  right: { right: 24 },
})

export default Item;
