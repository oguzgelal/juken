import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { StyleSheet, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import List from 'src/components/List/List';
import Modal, { DURATION_SAFE } from 'src/components/Modal/Modal';
import dialog from 'src/utils/dialog';
import { SKIP_MODE, QUICK_MODE } from 'src/common/constants';

const ReviewMenu = ({
  demo,
  logout,
  stopDemo,
  loadReviews,
  menuOpen,
  setMenuOpen,
  wrapUpMode,
}) => {

  const saveSetting = useStoreActions(actions => actions.session.saveSetting);
  const userSettings = useStoreState(state => state.session.userSettings);
  const skipMode = _.get(userSettings, SKIP_MODE);
  const quickMode = _.get(userSettings, QUICK_MODE);
  
  return (
    <Modal
      visible={menuOpen}
      close={() => setMenuOpen(false)}
    >
      <List
        lists={[
          {
            title: 'Review',
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
                title: 'Wrap-Up Mode',
                subtitle: 'Ask only reviews with unfinished pairs',
                leftIcon: <SimpleLineIcons name="clock" size={18} color="black" />,
                switch: {
                  value: wrapUpMode,
                  onValueChange: () => {
                    setWrapUpMode(!wrapUpMode);
                    setMenuOpen(false);
                  },
                }
              },
              {
                id: 'ses-quick',
                title: 'Quick Reveal',
                subtitle: 'Reveal by tapping anywhere on the card',
                leftIcon: <SimpleLineIcons name="energy" size={18} color="black" />,
                switch: {
                  value: quickMode,
                  onValueChange: () => {
                    saveSetting({ key: QUICK_MODE, value: !quickMode });
                  },
                }
              },
              {
                id: 'ses-skip',
                title: 'Answer Without Revealing',
                subtitle: 'Allows you to answer without revealing. Use wisely!',
                leftIcon: <SimpleLineIcons name="control-forward" size={18} color="black" />,
                switch: {
                  value: skipMode,
                  onValueChange: () => {
                    saveSetting({ key: SKIP_MODE, value: !skipMode });
                  },
                }
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
                onPress: async () => {
                  await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                },
              },
              {
                id: 'gen-bugs',
                title: 'Report Issues',
                leftIcon: <SimpleLineIcons name="ghost" size={18} color="black" />,
                onPress: async () => {
                  await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                },
              },
              {
                id: 'gen-code',
                title: 'Source Code',
                leftIcon: <SimpleLineIcons name="social-github" size={18} color="black" />,
                onPress: async () => {
                  await WebBrowser.openBrowserAsync('https://github.com/oguzgelal/juken')
                },
              },
              {
                id: 'gen-logout',
                title: 'Log Out',
                leftIcon: <SimpleLineIcons name="logout" size={18} color="red" />,
                onPress: () => {
                  setMenuOpen(false);
                  if (demo) stopDemo();
                  else logout();
                },
              }
            ]
          }
        ]}
      />
      <View style={{ height: 32 }} />
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
  // settings
  wrapUpMode: PropTypes.bool,
  setWrapUpMode: PropTypes.func,
  quickMode: PropTypes.bool,
  setQuickMode: PropTypes.func,
  skipMode: PropTypes.bool,
  setSkipMode: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default ReviewMenu;
