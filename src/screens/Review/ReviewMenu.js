import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import List from 'src/components/List/List';
import Modal, { DURATION_SAFE } from 'src/components/Modal/Modal';
import dialog from 'src/utils/dialog';

const ReviewMenu = ({
  demo,
  logout,
  stopDemo,
  loadReviews,
  menuOpen,
  setMenuOpen,
}) => {
  
  return (
    <Modal
      visible={menuOpen}
      close={() => setMenuOpen(false)}
    >
      <List
        lists={[
          {
            title: 'Session',
            items: [
              {
                id: 'ses-refresh',
                title: 'Refresh',
                leftIcon: <SimpleLineIcons name="refresh" size={18} color="black" />,
                onPress: () => {
                  dialog({
                    webTitle: 'Half completed reviews will be lost. Are you sure ?',
                    mobileTitle: 'Are you sure ?',
                    mobileMessage: 'Half completed reviews will be lost',
                    onConfirm: () => {
                      setMenuOpen(false);
                      setTimeout(() => {
                        loadReviews();
                      }, DURATION_SAFE);
                    }
                  });
                },
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
                onPress: () => {
                  setMenuOpen(false);
                  if (demo) stopDemo();
                  else logout();
                },
              }
            ],
          },
          {
            title: 'General',
            items: [
              /*
              {
                id: 'gen-settings',
                title: 'Settings',
                leftIcon: <SimpleLineIcons name="settings" size={18} color="black" />,
                onPress: () => {},
                chevron: true,
              },
              */
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
    </Modal>
  )
};

ReviewMenu.propTypes = {
  demo: PropTypes.bool,
  stopDemo: PropTypes.func,
  logout: PropTypes.func,
  loadReviews: PropTypes.func,
  menuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default ReviewMenu;
