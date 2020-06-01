import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import RNModal from 'react-native-modal';
import theme from 'src/common/theme';
import device from 'src/utils/device';
import Page from 'src/components/Page/Page';

const ModalComp = ({ visible, children, close }) => {

  const closeButton = (
    <TouchableOpacity onPress={close} style={styles.closeButton}>
      <AntDesign name="close" size={22} color={device('web') ? 'white' : 'black'} />
    </TouchableOpacity>
  );

  if (device('web')) {
    return !visible ? null : (
      <Modal
        transparent
        style={styles.webModalStyle}
      >
        <View style={styles.wrapper}>
          {closeButton}
          <ScrollView>
            <Page>
              <View style={styles.contents}>
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
      propagateSwipe
      useNativeDriver
    >
      <View style={styles.wrapper}>
        
        {closeButton}

        <ScrollView style={styles.contents}>
          {children}
        </ScrollView>
      </View>
    </RNModal>
  )
};

ModalComp.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.any,
};

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
      maxHeight: '84%',
      marginBottom: '-16%'
    },
    web: {
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .8)',
    }
  }),

  contents: {
    padding: 22,
    height: '100%',
    backgroundColor: theme.palette.white,
    borderRadius: 12,
  },

  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
    width: 22,
    height: 22,
  }
})

export default ModalComp;
