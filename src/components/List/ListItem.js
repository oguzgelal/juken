import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import device from 'src/utils/device';
import { useColorScheme } from "react-native-appearance";
import theme from 'src/common/theme';

const ListItemComponent = props => {
  const colorScheme = useColorScheme();
  return (
    <ListItem
      {...props}
      leftIcon={!props.leftIcon ? null :
        <View style={[styles.icon, colorScheme === 'light' ? null : styles.icon_dark]}>{props.leftIcon}</View>}
      rightIcon={!props.rightIcon ? null :
        <View style={[styles.icon, colorScheme === 'light' ? null : styles.icon_dark]}>{props.rightIcon}</View>}
      titleStyle={colorScheme === 'light' ? styles.title : styles.title_dark}
      subtitleStyle={[styles.subtitle, colorScheme === 'light' ? null : styles.subtitle_dark]}
      containerStyle={colorScheme === 'light' ? null : styles.container_dark}
      rightContentContainerStyle={styles.rightContent}
    />
  )
};

ListItemComponent.propTypes = {
};

const styles = StyleSheet.create({
  icon: device({
    web: { width: 32 },
    mobile: { width: 20 }
  }),
  icon_dark:device({
    web: { color: theme.palette_dark.white, },
    mobile: { color: theme.palette_dark.white, }
  }),
  title: {
    fontSize: 17,
  },
  title_dark: {
    fontSize: 17,
    color: theme.palette_dark.white,
  },
  container_dark: {
    backgroundColor: theme.palette_dark.gray,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    color: 'rgba(0, 0, 0, .3)',
  },
  subtitle_dark: {
    color: theme.palette_dark.lightGray,
  }
})

export default ListItemComponent;
