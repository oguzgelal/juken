import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Page = ({ children, styleWrapper, style, scroll }) => {
  
  const Base = os('mobile') ? SafeAreaView : View;
  const Contents = (os('mobile') && scroll) ? ScrollView : View;
  
  return (
    <Base
      style={[
        styles.wrapper,
        styleWrapper,
        (
          os('desktop') &&
          scroll &&
          styles.wrapperScroll
        ),
      ]}>
      <Contents style={[ styles.contents, style ]}>
        {children}
      </Contents>
    </Base>
  )
};

Page.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  styleWrapper: PropTypes.object,
  scroll: PropTypes.bool,
};

Page.defaultProps = {
  scroll: true,
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.body,
    overflow: 'hidden',
  },
  wrapperScroll: {
    height: 'auto',
    overflow: 'scroll',
    minHeight: '100%',
  },
  contents: sheet({
    base: {
      flex: 1,
      margin: 'auto',
      width: '100%',
    },
    web: {
      maxWidth: 520 + theme.paddings.u5,
      padding: theme.paddings.u5,
    }
  })
});

export default Page;