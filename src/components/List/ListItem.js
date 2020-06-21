import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import device from 'src/utils/device';

const ListItemComponent = props => {
  return (
    <ListItem
      {...props}
      leftIcon={!props.leftIcon ? null : <View style={styles.icon}>{props.leftIcon}</View>}
      rightIcon={!props.rightIcon ? null : <View style={styles.icon}>{props.rightIcon}</View>}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
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
  title: {
    fontSize: 17,
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
    color: 'rgba(0, 0, 0, .3)',
  }
})

export default ListItemComponent;
