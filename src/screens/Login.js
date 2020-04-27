import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
} from 'react-native';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/Input/TextInput';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Login = props => {

  return (
    <Page
      scroll={false}
      style={styles.wrapper}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={os('ios') ? 'padding' : 'height'}
      >
        <TextInput
          placeholder="WK Api Key"
          style={{ marginBottom: 8 }}
        />
        <Button text="Login" />
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