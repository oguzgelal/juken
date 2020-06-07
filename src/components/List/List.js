import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import theme from 'src/common/theme';

const List = ({ style, children, title }) => (
  <View style={[ styles.wrapper, style ]}>
    {title && (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )}
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

List.propTypes = {
  children: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: theme.palette.lightGray,
    paddingBottom: 12,
  },
  titleWrapper: {
    marginTop: 22,
    paddingLeft: 42,
    paddingRight: 42,
  },
  title: {
    color: theme.color.githubBlack,
    fontWeight: '700',
    letterSpacing: 1.4,
    fontSize: 13,
  },
  content: {
    marginTop: 12
  }
})

export default List;
