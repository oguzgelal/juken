import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Page from 'src/components/Page/Page';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Login = props => {

  return (
    <Page scroll={false}>
      <Text>Login</Text>
    </Page>
  )
};

Login.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {
  },
})

export default Login;