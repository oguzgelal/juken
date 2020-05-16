import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, Text, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import theme from 'src/common/theme';
import device from 'src/utils/device';

const Message = ({
  icon,
  iconStyle,
  style,
  title,
  description,
  component,
  loading,
  error,
  errorMessage,
  center,
  ctas = [],
}) => (
  <Page
    style={[
      styles.page,
      error && styles.coverError,
      style,
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

    {/** custom icon */}
    {icon && typeof icon === 'string' && <Text style={[styles.iconStyle, iconStyle]}>{icon}</Text>}
    {icon && typeof icon !== 'string' && <View style={[styles.iconStyle, iconStyle]}>{icon}</View>}

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

    {/** render cta's */}
    {ctas.length > 0 && ctas.filter(Boolean).map(cta => (
      <Button
        key={cta.id}
        style={[ styles.width, cta.style ]}
        text={cta.text}
        textStyle={cta.textStyle}
        onPress={cta.onPress}
        color={cta.color}
        iconRight={cta.iconRight}
      />
    ))}
    
  </Page>
);

Message.propTypes = {
  icon: PropTypes.any,
  iconStyle: PropTypes.object,
  style: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  component: PropTypes.any,
  ctas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    iconRight: PropTypes.any,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    color: PropTypes.string,
    onPress: PropTypes.func,
  }))
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
  width: device({
    web: { width: '60%' },
    mobile: { width: '80%' }
  }),
  text: {
    color: theme.palette.white,
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.palette.white,
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
  errorText: device({
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
