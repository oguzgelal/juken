import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import RNModal from 'react-native-modal';
import theme from 'src/common/theme';
import device from 'src/utils/device';
import Page from 'src/components/Page/Page';
import TopBar from 'src/components/TopBar/TopBar';

const ModalComp = ({
  visible,
  children,
  close,
  closeAnimation,
  contentStyle,
}) => {

  if (!closeAnimation && !visible) return null;

  const topBar = (
    <TopBar
      rightOnPress={close}
      right={(
        <AntDesign
          name="close"
          color="black"
          size={22}
        />
      )}
    />
  )

  if (device('web')) {
    return !visible ? null : (
      <Modal
        transparent
        style={styles.webModalStyle}
      >
        <View style={styles.wrapper}>
          <ScrollView style={{ minHeight: '100%' }}>
            <Page center style={{ minHeight: '100vh' }}>

              {/** heading */}
              <View style={styles.heading}>
                {topBar}
              </View>

              {/** contents */}
              <View style={[ styles.contents, contentStyle ]}>
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
    >
      <View style={styles.wrapper}>
        
        {/** heading */}
        <View style={styles.heading}>
          {topBar}
        </View>
        
        {/** contents */}
        <ScrollView style={[ styles.contents, contentStyle ]}>
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
      zIndex: 999,
      width: '100%',
      height: '100%',
    }
  }),

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

  heading: {
    height: 52,
    width: '100%',
    backgroundColor: theme.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.gray,
    paddingLeft: 12,
    paddingRight: 12,
  },

  contents: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.lightGray,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
})

export default ModalComp;
