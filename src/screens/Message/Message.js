import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, Text, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Page from 'src/components/Page/Page';
import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';

const Message = ({
  title,
  description,
  component,
  loading,
  error,
  errorMessage,
  center,
}) => (
  <Page
    style={[
      styles.page,
      error && styles.coverError
    ]}
  >
    
    {/** loading indicator */}
    {loading && (
      <ActivityIndicator
        size="large"
        color={theme.palette.white}
      />  
    )}

    {/** error icon */}
    {error && (
      <AntDesign
          name="frowno"
          size={52}
          color={theme.palette.white}
        />
    )}

    {/** page title */}
    {title && (
      <Text
        style={[
          styles.text,
          styles.width,
          styles.title,
        ]}
      >
        {title}
      </Text>
    )}
    
    {/** page description */}
    {description && (
      <Text
        style={[
          styles.text,
          styles.width,
          styles.description,
          center && styles.center,
        ]}>
        {description}
      </Text>
    )}
    
    {/** print error message */}
    {errorMessage && (
      <ScrollView style={[ styles.width, styles.error ]}>
        <Text textBreakStrategy="simple" style={styles.errorText}>
          {errorMessage}
        </Text>
      </ScrollView>
    )}

    {/** render any component for description */}
    {!!component && (
      <View style={[ styles.text, styles.width]}>
        {component}
      </View>
    )}
    
  </Page>
);

Message.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  component: PropTypes.any,
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.body,
  },
  coverError: {
    backgroundColor: theme.palette.red,
  },
  center: {
    textAlign: 'center',
  },
  width: sheet({
    web: { width: '60%' },
    mobile: { width: '80%' }
  }),
  text: {
    color: theme.palette.white,
    textAlign: 'center',
  },
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
  },
  error: {
    backgroundColor: 'rgba(255, 255, 255, .2)',
    borderRadius: 4,
    padding: 8,
    marginTop: 16,
    height: 220,
    flexGrow: 0,
    overflow: 'hidden',
  },
  errorText: sheet({
    base: {
      textAlign: 'left',
      fontFamily: 'monospace',
      color: theme.palette.white,
      fontSize: 9,
    },
    web: {
      wordBreak: 'break-all',
    }
  })
})

export default Message;
