import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Item from 'src/components/List/Item';
import theme from 'src/common/theme';

const ListItem = ({
  title,
  titleStyle,
  description,
  icon,
  ...props
}) => {
  return (
    <Item
      {...props}
      style={styles.wrapper}
      left={(
        <View style={styles.mobileLeftWrapper}>
          <View style={styles.icon}>{icon}</View>
          <View style={styles.textWrapper}>
            <Text style={titleStyle}>{title}</Text>
            {description && (
              <Text style={styles.descriptionStyle}>{description}</Text>
            )}
          </View>
        </View>
      )}
    />
  )
};

ListItem.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([
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
  textWrapper: {
    width: '80%',
  },
  descriptionStyle: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, .3)',
  }
})

export default ListItem;
