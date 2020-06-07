import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Item from 'src/components/List/Item';
import device from 'src/utils/device';

const ListItem = ({ text, textStyle, icon, ...props }) => {
  const isWeb = device('web');

  return (
    <Item
      {...props}
      style={styles.wrapper}
      left={(
        <View style={styles.mobileLeftWrapper}>
          <View style={styles.icon}>{icon}</View>
          <Text style={textStyle}>{text}</Text>
        </View>
      )}
    />
  )
};

ListItem.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    backgroundColor: 'whitesmoke',
    borderRadius: 8,
  },
})

export default ListItem;
