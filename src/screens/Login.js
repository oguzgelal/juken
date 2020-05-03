import React, { useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import Toast, { TYPES } from 'src/components/Toast/Toast';
import os from 'src/utils/os';
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
    <>
      {/* toasts */}
      <Toast ref={failed} type={TYPES.ERROR} />
      <Toast ref={empty} type={TYPES.WARNING} />

      {/* page */}
      <Page
        scroll={false}
        style={styles.wrapper}
        onPress={() => {
          if (os('mobile')) {
            Keyboard.dismiss();
          }
        }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={os('ios') ? 'padding' : 'height'}
        >
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
    </>
  )
};

Login.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.padding.body,
  },
  container: {
    width: '100%',
  }
})

export default Login;