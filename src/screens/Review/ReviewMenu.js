import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons'; 
import List from 'src/components/List/List';

const ReviewMenu = props => {
  
  return (
    <List
      lists={[
        {
          title: 'Session',
          items: [
            {
              id: 'ses-refresh',
              title: 'Refresh',
              leftIcon: <SimpleLineIcons name="refresh" size={18} color="black" />,
              onPress: () => {},
            },
            {
              id: 'ses-wrap',
              title: 'Wrap Up',
              subtitle: 'Bring unfinished review pairs to the top',
              leftIcon: <SimpleLineIcons name="clock" size={18} color="black" />,
              onPress: () => {},
            },
            {
              id: 'ses-logout',
              title: 'Log Out',
              leftIcon: <SimpleLineIcons name="logout" size={18} color="red" />,
              onPress: () => {},
            }
          ],
        },
        {
          title: 'General',
          items: [
            {
              id: 'gen-settings',
              title: 'Settings',
              leftIcon: <SimpleLineIcons name="settings" size={18} color="black" />,
              onPress: () => {},
              chevron: true,
            },
            {
              id: 'gen-fb',
              title: 'Feedback',
              leftIcon: <SimpleLineIcons name="bubble" size={18} color="black" />,
              onPress: () => {},
            },
            {
              id: 'gen-bugs',
              title: 'Report Issues',
              leftIcon: <SimpleLineIcons name="ghost" size={18} color="black" />,
              onPress: () => {},
            },
            {
              id: 'gen-code',
              title: 'Source Code',
              leftIcon: <SimpleLineIcons name="social-github" size={18} color="black" />,
              onPress: () => {},
            },
          ]
        }
      ]}
    />
  )
};

ReviewMenu.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default ReviewMenu;
