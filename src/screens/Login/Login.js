import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import Toast, { TYPES } from 'src/components/Toast/Toast';
import device from 'src/utils/device';
import theme from 'src/common/theme';
import { login } from 'src/features/wk/api';
import { useWk } from 'src/features/wk/hooks';

const Login = props => {
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
        if (device('mobile')) {
          Keyboard.dismiss();
        }
      }}
    >
      <View style={styles.page}>
        
        {/* toasts */}
        <Toast ref={failed} type={TYPES.ERROR} />
        <Toast ref={empty} type={TYPES.WARNING} />

        {/* page */}
        <Page padding style={styles.page}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={device('ios') ? 'padding' : 'height'}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={require('./wa.png')}
                style={styles.image}
              />
            </View>

            <TextInput
              placeholder="WaniKani Api Key v2"
              value={key}
              onChangeText={text => setKey(text)}
            />
            <Button
              style={{ marginTop: 8 }}
              text={loginLoading ? 'Logging in...' : 'Login'}
              disabled={loginLoading}
              onPress={() => {
                if (!key) {
                  empty.current.show('Please enter your API key');
                  return;
                }
                loginFn();
              }}
            />
            
          </KeyboardAvoidingView>
        </Page>
      </View>
    </TouchableWithoutFeedback>
  )
};

Login.propTypes = {
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
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  image: {
    width: 200,
    height: 40,
  }
})

export default Login;