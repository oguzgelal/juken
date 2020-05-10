import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import device from 'src/utils/device';
import theme from 'src/common/theme';

const Page = ({
  children,
  style,
  padding,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
}) => {
  const insets = useSafeArea();

  const pTop = padding ? theme.padding.body : paddingTop;
  const pBottom = padding ? theme.padding.body : paddingBottom;
  const pLeft = padding ? theme.padding.body : paddingLeft;
  const pRight = padding ? theme.padding.body : paddingRight;

  return (
    <View
      style={[
        {
          paddingTop: pTop + insets.top,
          paddingLeft: pLeft + insets.left,
          paddingBottom: pBottom + insets.bottom,
          paddingRight: pRight + insets.right,
        },
        styles.wrapper,
        style,
      ]}
    >
      {children}
    </View>
  )
};

Page.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  padding: PropTypes.bool,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
};

const styles = StyleSheet.create({
  wrapper: device({
    web: {
      paddingLeft: '32vw',
      paddingRight: '32vw',
      paddingTop: 32
    }
  })
})

export default Page;
