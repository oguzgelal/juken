import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Page from 'src/components/Page/Page';
import theme from 'src/common/theme';

const Loading = props => (
  <Page scroll={false} style={styles.wrapper}>
    <ActivityIndicator
      size="large"
      color={theme._palette.white}
    />
  </Page>
);

Loading.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Loading;
