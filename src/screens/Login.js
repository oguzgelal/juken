import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

const Login = props => {

  return (
    <Page scroll={false} style={styles.wrapper}>
      <View>
        <Button text="Login" />
      </View>
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