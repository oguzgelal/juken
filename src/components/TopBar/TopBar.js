import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import theme from 'src/common/theme';

const TopBar = ({
  style,
  center,
  centerText,
  centerOnPress,
  left,
  leftText,
  leftOnPress,
  right,
  rightText,
  rightOnPress,
}) => {
  return (
    <View style={[ styles.wrapper, style ]}>
      
      {/** left */}
      <TouchableOpacity
        onPress={leftOnPress}
        disabled={!leftOnPress}
        style={[ styles.cell, styles.side, styles.left ]}
      >
        {!!left && left}
        {!!leftText && (
          <Text
            children={leftText}
            style={[ styles.text, styles.leftText ]}
          />
        )}
      </TouchableOpacity>

      {/** center */}
      <TouchableOpacity
        onPress={centerOnPress}
        disabled={!centerOnPress}
        style={[ styles.cell, styles.center ]}
      >
        {!!center && center}
        {!!centerText && (
          <Text
            children={centerText}
            style={[ styles.text, styles.centerText ]}
          />
        )}
      </TouchableOpacity>

      {/** right */}
      <TouchableOpacity
        onPress={rightOnPress}
        disabled={!rightOnPress}
        style={[ styles.cell, styles.side, styles.right ]}
      >
        {!!right && right}
        {!!rightText && (
          <Text
            children={rightText}
            style={[ styles.text, styles.rightText ]}
          />
        )}
      </TouchableOpacity>
    </View>
  )
};

TopBar.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  
  center: PropTypes.any,
  centerText: PropTypes.string,
  centerOnPress: PropTypes.func,

  left: PropTypes.any,
  leftText: PropTypes.string,
  leftOnPress: PropTypes.func,

  right: PropTypes.any,
  rightText: PropTypes.string,
  rightOnPress: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: 22,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  center: { flexGrow: 1 },
  side: { position: 'absolute', zIndex: 1 },
  left: { left: 0 },
  right: { right: 0 },

  text: {
    color: theme.palette.white,
    fontSize: 14,
    fontWeight: '500',
  }
  
})

export default TopBar;
