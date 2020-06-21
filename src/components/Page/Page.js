import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { media } from 'src/utils/device';
import theme from 'src/common/theme';

const Page = ({
  center,
  children,
  style,
}) => {
  const insets = useSafeArea();

  // general padding around container
  let pTop = theme.padding.body + insets.top;
  let pBottom = theme.padding.body + insets.bottom;
  let pLeft = theme.padding.body + insets.left;
  let pRight = theme.padding.body + insets.right;

  // responsive paddings
  const {
    desktop,
    tablet,
    mobile,
  } = media();
  
  if (desktop) {
    pTop = '4%';
    pBottom = center ? '4%' : '2.5%';
    pLeft = '32%';
    pRight = '32%';
  }
  if (tablet) {
    pTop = '6%';
    pBottom = center ? '6%' : '4%';
    pLeft = '22%';
    pRight = '22%';
  }
  if (mobile) {
    pTop = '8%';
    pBottom = center ? '8%' : '6%';
    pLeft = '8%';
    pRight = '8%';
  }

  return (
    <View
      style={[
        {
          paddingTop: pTop,
          paddingLeft: pLeft,
          paddingBottom: pBottom,
          paddingRight: pRight,
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
  center: PropTypes.bool, // center content: top and bottom padding equal
  children: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  wrapper: {},
})

export default Page;
