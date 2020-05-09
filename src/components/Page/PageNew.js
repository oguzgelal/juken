import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Page = ({ children, style }) => {
  const insets = useSafeArea();
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
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
};

const styles = StyleSheet.create({
  wrapper: sheet({
    web: {
      paddingLeft: '32vw',
      paddingRight: '32vw',
      paddingTop: 32
    }
  })
})

export default Page;
