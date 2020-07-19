import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import theme from 'src/common/theme';
import { useColorScheme } from 'react-native-appearance';

const ListWrapper = ({ style, title, children }) => {

  const colorScheme = useColorScheme();

  return <View style={[styles.wrapper, colorScheme === 'light' ? null : styles.wrapper_dark, style]}>
    
    {/** add title to the list */}
    {title && (
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, colorScheme === 'light' ? null : styles.title_dark]}>{title}</Text>
      </View>
    )}
    
    {/** list children */}
    {children}
  </View>
}

ListWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: theme.palette.lightGray,
  },
  wrapper_dark: {
    backgroundColor: theme.palette_dark.black,
  },
  titleWrapper: {
    marginTop: 22,
    marginBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
  },
  title: {
    color: theme.color.githubBlack,
    fontWeight: '700',
    letterSpacing: 1.4,
    fontSize: 13,
  },
  title_dark:{
    color: theme.palette_dark.lightGray,
  }
})

export default ListWrapper;
