import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Page from 'src/components/Page/Page';
import theme from 'src/common/theme';

const Loading = props => (
  <Page scroll={false} style={styles.wrapper}>
    <Text style={styles.text}>Loading...</Text>
  </Page>
);

Loading.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme._palette.white,
  }
})

export default Loading;
