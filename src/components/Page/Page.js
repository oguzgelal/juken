import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Page = ({
  children,
  styleCover,
  styleWrapper,
  style,
  scroll = true,
  statusBar = true,
  onPress,
}) => {
  
  const Base = os('mobile') ? SafeAreaView : View;
  const Contents = (os('mobile') && scroll) ? ScrollView : View;
  
  const pageDesktopScrollHeight = statusBar
    ? `calc(100vh - ${theme.height.statusBar + theme.padding.pageTop})`
    : '100vh';

  return (
    <>
      <TouchableWithoutFeedback
        onPress={onPress}
        accessible={false}
      >
        <View
          style={[
            styles.cover,
            styleCover,
          ]}
        >
          {statusBar && (
            <View
              style={styles.statusBar}
            />
          )}
          <Base
            style={[
              styles.wrapper,
              styleWrapper,
              (os('desktop') && scroll && styles.wrapperScroll),
              (os('desktop') && !scroll && { height: pageDesktopScrollHeight }),
            ]}
          >
            <Contents style={[ styles.contents, style ]}>
              {children}
            </Contents>
          </Base>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
};

Page.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  styleCover: PropTypes.object,
  styleWrapper: PropTypes.object,
  scroll: PropTypes.bool,
  onPress: PropTypes.func,
  statusBar: PropTypes.bool,
};

const styles = StyleSheet.create({
  statusBar: sheet({
    base: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    mobile: {
      height: Constants.statusBarHeight + theme.height.statusBar,
    },
    web: {
      height: theme.height.statusBar,
    }
  }),
  cover: sheet({
    base: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: theme.bg.body,
    },
    web: {
      cursor: 'default',
    }
  }),
  wrapper: {
    flex: 1,
    position: 'relative',
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
      position: 'relative',
      paddingTop: theme.padding.pageTop,
    },
    web: {
      maxWidth: 520 + theme.padding.body,
      padding: theme.padding.body,
    }
  })
});

export default Page;