import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import isNil from 'lodash/isNil';
import theme from 'src/common/theme';

const headerHeight = 22;

const CardHeader = ({
  centerText,
  centerIcon,
  leftText,
  leftIcon,
  rightText,
  rightIcon,
}) => (
  <View style={[ styles.wrapper ]}>
    
    {/* left label */}
    <View
      style={[
        styles.labelWrapper,
        styles.labelWrapperSide,
        styles.labelWrapperLeft,
      ]}
    >
      {!isNil(leftText) && (
        <Text style={styles.labelText}>
          {leftText}
        </Text>
      )}
      {!isNil(leftIcon) && (
        leftIcon
      )}
    </View>

    {/* center label */}
    <View
      style={[
        styles.labelWrapper,
        styles.labelWrapperCenter
      ]}
    >
      {!isNil(centerText) && (
        <Text style={styles.labelText}>
          {centerText}
        </Text>
      )}
      {!isNil(centerIcon) && (
        centerIcon
      )}
    </View>
    
    {/* right label */}
    <View
      style={[
        styles.labelWrapper,
        styles.labelWrapperSide,
        styles.labelWrapperRight,
      ]}
    >
      {!isNil(rightText) && (
        <Text style={styles.labelText}>
          {rightText}
        </Text>
      )}
      {!isNil(rightIcon) && (
        rightIcon
      )}
    </View>
  </View>
);

CardHeader.propTypes = {
  centerText: PropTypes.string,
  centerIcon: PropTypes.any,
  leftText: PropTypes.string,
  leftIcon: PropTypes.any,
  rightText: PropTypes.string,
  rightIcon: PropTypes.any,
};

const styles = StyleSheet.create({
  wrapper: {
    height: headerHeight,
    flex: 1,
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
  },
  labelWrapper: {
    height: headerHeight,
    flex: 1,
    justifyContent: 'center',
  },
  labelWrapperCenter: {
    flexGrow: 1,
    alignItems: 'center',
  },
  labelWrapperSide: {
    flexShrink: 0,
    position: 'absolute',
    top: 0,
  },
  labelWrapperLeft: {
    left: 0,
    alignItems: 'flex-start',
  },
  labelWrapperRight: {
    right: 0,
    alignItems: 'flex-end',
  },
  labelText: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '700',
    color: theme.palette.gray,
  }
})

export default CardHeader;
