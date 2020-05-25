import React, { useState, useRef, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useStoreActions, useStoreState } from 'easy-peasy';

import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';

import PropTypes from 'prop-types';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import Toast, { TYPES } from 'src/components/Toast/Toast';
import device from 'src/utils/device';
import theme from 'src/common/theme';

const Login = ({ startDemo }) => {
  const [ token, setToken ] = useState('');
  const failed = useRef(null);
  const empty = useRef(null);
  const { showActionSheetWithOptions } = useActionSheet();

  const login = useStoreActions(actions => actions.session.login);
  const loginLoading = useStoreState(state => state.loadings.login);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (device('mobile')) Keyboard.dismiss();
      }}
    >
      <View style={styles.page}>
        
        {/* toasts */}
        <Toast ref={failed} type={TYPES.ERROR} />
        <Toast ref={empty} type={TYPES.WARNING} />

        {/* page */}
        <Page style={styles.page}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={device('ios') ? 'padding' : 'height'}
          >
            <View style={styles.imageWrapper}>
              <Image source={require('./logo.png')} style={styles.imageIcon} />
              <Image source={require('./wa2.png')} style={styles.imageText} /> 
            </View>

            <TextInput
              placeholder="WaniKani Personal Access Token"
              value={token}
              onChangeText={text => setToken(text)}
            />

            {/* login button */}
            <Button
              style={{ marginTop: 8 }}
              textStyle={{ color: theme.palette.black }}
              text={loginLoading ? 'Logging in...' : 'Login'}
              iconRight={
                loginLoading
                  ? <ActivityIndicator size={24} color={theme.palette.black} />
                  : <AntDesign name="arrowright" size={24} color={theme.palette.black} />
              }
              disabled={loginLoading}
              onPress={() => {
                if (device('mobile')) Keyboard.dismiss();
                if (!token) {
                  empty.current.show('Please enter your API token');
                  return;
                }
                if (token === '1111') {
                  startDemo();
                  return;
                }
                login({
                  token,
                  onFail: () => failed.current.show('Invalid token')
                });
              }}
            />

            {/* more button */}
            {device('mobile') && (
              <Button
                textStyle={{ color: theme.palette.white }}
                text="More"
                style={{ marginTop: 12, backgroundColor: 'transparent' }}
                onPress={() => {
                  showActionSheetWithOptions({
                    options: [
                      'Cancel',
                      'Feedback',
                      'Report Issues',
                      'Source Code',
                      device('ios') ? null : 'Demo',
                    ].filter(Boolean),
                  }, async buttonIndex => {
                    if (buttonIndex === 1) {
                      await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                    } else if (buttonIndex === 2) {
                      await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                    } else if (buttonIndex === 3) {
                      await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                    } else if (buttonIndex === 4) {
                      startDemo()
                    }
                  })
                }}
              />
            )}

            {/** do not show this part for iOS */}
            {device('web') && (
              <>
                <View style={styles.or}>
                  <Text style={styles.orText}>-or-</Text>
                </View>
                
                {/* demo button */}
                <Button
                  text="Demo"
                  iconLeft={<MaterialCommunityIcons name="test-tube" size={24} color={theme.palette.black} />}
                  onPress={() => startDemo()}
                />

                {/* feedback button */}
                <Button
                  style={{ marginTop: 8 }}
                  text="Feedback & Bug Report"
                  iconLeft={<MaterialIcons name="email" size={24} color={theme.palette.black} />}
                  onPress={async () => {
                    await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                  }}
                />
                
                {/* source code button */}
                <Button
                  style={{
                    marginTop: 8,
                    backgroundColor: theme.color.githubBlack
                  }}
                  textStyle={{
                    color: theme.color.githubWhite
                  }}
                  text="Source Code"
                  iconLeft={<AntDesign name="github" size={24} color={theme.color.githubWhite} />}
                  onPress={async () => {
                    await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                  }}
                />
              </>
            )}
            
          </KeyboardAvoidingView>
        </Page>
      </View>
    </TouchableWithoutFeedback>
  )
};

Login.propTypes = {
  startDemo: PropTypes.func,
};

const styles = StyleSheet.create({
  page: device({
    base: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: theme.bg.body,
    },
    web: {
      cursor: 'default',
    }
  }),
  container: {
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  imageIcon: {
    width: 80,
    height: 80,
    margin: 'auto',
    marginBottom: 18,
  },
  imageText: {
    width: 'auto',
    width: 160,
    height: 48.85,
    margin: 'auto',
  },
  or: {
    marginTop: 12,
    marginBottom: 12,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  orText: {
    color: theme.palette.white,
    fontWeight: '700',
    fontSize: 12,
  }
})

export default Login;