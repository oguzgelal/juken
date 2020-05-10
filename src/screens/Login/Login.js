import React, { useState, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'expo';

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

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import PropTypes from 'prop-types';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import Toast, { TYPES } from 'src/components/Toast/Toast';
import device from 'src/utils/device';
import theme from 'src/common/theme';
import { login } from 'src/features/wk/api';
import { useWk } from 'src/features/wk/hooks';

const Login = ({ startDemo }) => {
  const [ key, setKey ] = useState('');
  const failed = useRef(null);
  const empty = useRef(null);

  const [ loginFn, loginLoading ] = useWk(login, {
    apiKey: key,
    onError: () => {
      failed.current.show('Invalid API Key')
    }
  });

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
              <Image source={require('./wa.png')} style={styles.imageText} /> 
            </View>

            <TextInput
              placeholder="WaniKani Api Key v2"
              value={key}
              onChangeText={text => setKey(text)}
            />

            {/* login button */}
            <Button
              style={{ marginTop: 8, backgroundColor: theme.palette.green }}
              textStyle={{ color: theme.palette.black, opacity: 0.8 }}
              text={loginLoading ? 'Logging in...' : 'Login'}
              iconRight={
                loginLoading
                  ? <ActivityIndicator size={24} color={theme.palette.black} />
                  : <AntDesign name="arrowright" size={24} style={{ opacity: 0.8 }} color={theme.palette.black} />
              }
              disabled={loginLoading}
              onPress={() => {
                if (device('mobile')) Keyboard.dismiss();
                if (!key) {
                  empty.current.show('Please enter your API key');
                  return;
                }
                loginFn();
              }}
            />

            <View style={styles.or}>
              <Text style={styles.orText}>-or-</Text>
            </View>
            
            {/* demo button */}
            <Button
              text="View Demo"
              iconLeft={<MaterialCommunityIcons name="test-tube" size={24} color={theme.palette.black} />}
              onPress={() => startDemo()}
            />

            {/* feedback button */}
            <Button
              style={{ marginTop: 8 }}
              text="Feedback / Bug Report"
              iconLeft={<AntDesign name="mail" size={24} color={theme.palette.black} />}
              onPress={() => {
                Linking.openURL('mailto: o.gelal77@gmail.com?subject=WaniAnki - Feedback / Bug Report')
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
              text="View Source Code"
              iconLeft={<AntDesign name="github" size={24} color={theme.color.githubWhite} />}
              onPress={async () => {
                await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/wanianki')
              }}
            />
            
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
    width: 180,
    height: 36,
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
    opacity: 0.8,
    fontSize: 12,
  }
})

export default Login;