import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import device from 'src/utils/device';
import useColorScheme from 'src/hooks/useColorScheme';;
import theme from 'src/common/theme';

const ListItemComponent = props => {
  const colorScheme = useColorScheme();
  return (
    <ListItem {...props}>
      {props.leftIcon && <View style={[styles.icon, colorScheme === 'light' ? null : styles.icon_dark]}>{props.leftIcon}</View>}
      <ListItem.Content style={colorScheme === 'light' ? null : styles.container_dark}>
        <ListItem.Title style={colorScheme === 'light' ? styles.title : styles.title_dark}>{props.title}</ListItem.Title>
        {props.subtitle && (
          <Text style={[styles.subtitle, colorScheme === 'light' ? null : styles.subtitle_dark]}>{props.subtitle}</Text>
        )}
      </ListItem.Content>
      {props.rightIcon && <View style={[styles.icon, colorScheme === 'light' ? null : styles.icon_dark]}>{props.rightIcon}</View>}
      {props.switch && <Switch {...props.switch} />}
    </ListItem>
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
