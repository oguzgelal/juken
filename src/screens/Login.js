import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import api from 'src/models/api';

const Login = props => {

  const [ key, setKey ] = useState('');

  return (
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
          style={{ marginBottom: 8 }}
          value={key}
          onChangeText={text => setKey(text)}
        />
        <Button
          text="Login"
          onPress={() => api.login(key)}
        />
      </KeyboardAvoidingView>
    </Page>
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