import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import Page from 'src/components/Page/Page';
import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';

const Loading = props => (
  <Page scroll={false} style={styles.wrapper}>
    <ActivityIndicator
      size="large"
      color={theme.palette.white}
    />
    <Text style={[ styles.text, styles.title ]}>
      {props.title}
    </Text>
    <Text style={[ styles.text, styles.description]}>
      {props.description}
    </Text>
  </Page>
);

Loading.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: sheet({
    base: {
      color: theme.palette.white,
      textAlign: 'center',
    },
    web: { width: '60%' },
    mobile: { width: '80%' }
  }),
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18,
  },
  description: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'justify',
  }
})

export default Loading;
