import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import Toast, { TYPES, DURATION } from 'src/components/Toast/Toast';
import os from 'src/utils/os';
import theme from 'src/common/theme';
import wk from 'src/models/wk';

const Login = props => {

  const [ key, setKey ] = useState('');
  const loggingIn = wk.isLoading('login');
  const failed = useRef(null);

  return (
    <>
      {/* failed to login toast */}
      <Toast ref={failed} type={TYPES.ERROR} />
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
            placeholder="WaniKani Api Key"
            value={key}
            onChangeText={text => setKey(text)}
          />
          <Button
            style={{ marginTop: 8 }}
            text={loggingIn ? 'Logging in...' : 'Login'}
            disabled={loggingIn}
            onPress={() => wk.login(key)}
          />

          <Button
            style={{ marginTop: 8 }}
            text="Test"
            onPress={() => {
              failed.current.show('Invalid API Key');
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