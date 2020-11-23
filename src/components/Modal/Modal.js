import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNModal from 'react-native-modal';
import theme from 'src/common/theme';
import device from 'src/utils/device';
import Page from 'src/components/Page/Page';
import TopBar from 'src/components/TopBar/TopBar';
import useColorScheme from 'src/hooks/useColorScheme';;

export const DURATION = 300;
export const DURATION_SAFE = DURATION + 100;

const ModalComp = ({
  visible,
  children,
  close,
  contentStyle,
  closeAnimation,
}) => {

  if (!closeAnimation && !visible) return null;

  const colorScheme = useColorScheme();

  const topBar = (
    <TopBar
      rightOnPress={close}
      right={(
        <AntDesign
          name="close"
          color={colorScheme === "light" ? "black": "white"}
          size={22}
        />
      )}
    />
  )

  if (device('web')) {
    return !visible ? null : (
      <Modal
        transparent
        style={[styles.webModalStyle, colorScheme === 'light' ? null : styles.webModalStyle_dark]}
      >
        <View style={[styles.wrapper, colorScheme === 'light' ? null : styles.wrapper_dark]}>
          <ScrollView style={{minHeight: '100%'}}>
            <Page center style={{minHeight: '100vh'}}>

              {/** heading */}
              <View style={[styles.heading, colorScheme === 'light' ? null : styles.heading_dark]}>
                {topBar}
              </View>

              {/** contents */}
              <View style={[styles.contents, colorScheme === 'light' ? null : styles.contents_dark, contentStyle]}>
                {children}
              </View>
            </Page>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={close}
      onBackdropPress={close}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      propagateSwipe
      animationInTiming={DURATION}
      animationOutTiming={DURATION}
      backdropTransitionInTiming={DURATION}
      backdropTransitionOutTiming={0}

    >
      <View style={[styles.wrapper, colorScheme === 'light' ? null : styles.wrapper_dark]}>

        {/** heading */}
        <View style={[styles.heading, colorScheme === 'light' ? null : styles.heading_dark]}>
          {topBar}
        </View>

        {/** contents */}
        <ScrollView style={[ styles.contents, colorScheme === 'light' ? null : styles.contents_dark, contentStyle ]}>
          {children}
        </ScrollView>
      </View>
    </RNModal>
  )
};

ModalComp.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  close: PropTypes.func,
  closeAnimation: PropTypes.bool,
};

ModalComp.defaultProps = {
  closeAnimation: true,
}

const styles = StyleSheet.create({
  webModalStyle: device({
    web: {
      position: 'fixed',
      border: 'none',
      borderWidth: 0,
      margin: 0,
      top: 0,
      left: 0,
      zIndex: 9999999999,
      width: '100%',
      height: '100%',
    }
  }),

  webModalStyle_dark : {
    backgroundColor: theme.palette_dark.black,
  },

  wrapper: device({
    base: {
      position: 'relative',
      padding: 0,
    },
    mobile: {
      maxHeight: '85%',
    },
    web: {
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .8)',
    }
  }),

  wrapper_dark : {
    backgroundColor: theme.palette_dark.black,
  },

  heading: {
    height: 52,
    width: '100%',
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: theme.radius.card,
    borderTopRightRadius: theme.radius.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.gray,
    paddingLeft: 12,
    paddingRight: 12,
  },

  heading_dark : {
    backgroundColor: theme.palette_dark.gray,
    borderBottomColor: theme.palette_dark.black,
  },

  contents: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.lightGray,
    borderRadius: theme.radius.card,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  contents_dark: {
    backgroundColor: theme.palette_dark.black,
  },
})

export default ModalComp;
