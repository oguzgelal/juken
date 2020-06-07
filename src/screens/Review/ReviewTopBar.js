import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SimpleLineIcons, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import { useActionSheet } from '@expo/react-native-action-sheet';
import useNetworkListener from 'src/hooks/useNetworkListener';
import TopBar from 'src/components/TopBar/TopBar';
import Modal from 'src/components/Modal/Modal';
import List from 'src/components/List/List';
import ListItem from 'src/components/List/ListItem';

import Badge from 'src/components/Badge/Badge';
import theme from 'src/common/theme';
import dialog from 'src/utils/dialog';

const ReviewTopBar = ({
  demo,
  logout,
  stopDemo,
  loadReviews,
  submissionQueue,
  submissionErrors,
  ignoreSubmissionErrors,
  retrySubmission,
  isQueueClear,
}) => {
  
  const isInternetReachable = useNetworkListener();
  const { showActionSheetWithOptions } = useActionSheet();
  const [ menuOpen, setMenuOpen ] = useState(false);

  const uploadSuccess = submissionQueue.length === 0;
  const uploadFail = submissionErrors.length > 0;
  const uploadQueue = submissionQueue.length;
  const uploadErrors = submissionErrors.length;

  let badgeColor = uploadFail
    ? theme.palette.red
    : 'rgba(0, 0, 0, .1)';
  
  let badgeIcon = null;
  if (uploadSuccess) badgeIcon = <AntDesign name="check" size={10} color="white" />;
  if (uploadQueue > 0) badgeIcon = <AntDesign name="arrowup" size={10} color="white" />;

  let badgeText = null;
  if (uploadQueue > 0) badgeText = uploadQueue;
  if (uploadFail) badgeText = uploadErrors;

  return (
    <>

      {/** review menu */}
      <Modal visible={menuOpen} close={() => setMenuOpen(false)}>
        <List style={{ paddingTop: 12 }}>
          <ListItem
            icon={<SimpleLineIcons name="refresh" size={18} color="black" />}
            text="Refresh"
            onPress={() => {
              dialog({
                webTitle: 'Half completed reviews will be lost. Are you sure ?',
                mobileTitle: 'Are you sure ?',
                mobileMessage: 'Half completed reviews will be lost',
                onConfirm: () => {
                  setMenuOpen(false);
                  loadReviews();
                }
              });
            }}
          />
          <ListItem
            icon={<AntDesign name="logout" size={18} color='red' />}
            text="Log Out"
            textStyle={{ color: 'red' }}
            onPress={() => {
              setMenuOpen(false);
              if (demo) stopDemo();
              else logout();
            }}
          />
        </List>
      </Modal>

      {/** top bar */}
      <TopBar
        style={styles.wrapper}
        centerText={isQueueClear ? '' : 'Reviews'}
        left={<Entypo name="menu" size={20} color="white" />}
        leftOnPress={() => setMenuOpen(true)}
        right={
          <>
            {!isInternetReachable && (
              <Badge
                style={{ marginRight: 6, backgroundColor: theme.palette.red }}
                icon={<Feather name="wifi-off" size={10} color="white" />}
              />
            )}
            <Badge
              style={{ backgroundColor: badgeColor }}
              text={badgeText}
              icon={badgeIcon}
            />
          </>
        }
        rightOnPress={!uploadFail ? null : () => {
          showActionSheetWithOptions({
              options: [
                'Cancel',
                'Retry',
                'Ignore',
              ],
              destructiveButtonIndex: 2,
              title: `Failed to submit ${uploadErrors} review${uploadErrors === 1 ? '' : 's'}`,
              message: (
                'You can retry submission after making sure your device ' +
                'has an active internet connection. If you submitted the reviews ' +
                'from another application, please use the Ignore button to dismiss ' +
                'the errors.'
              ),
            }, buttonIndex => {
              if (buttonIndex === 1) {
                retrySubmission();
              } else if (buttonIndex === 2) {
                dialog({
                  webTitle: 'Unless you submitted your reviews elsewhere, your unsubmitted reviews will be lost. Are you sure ?',
                  mobileTitle: 'Are you sure ?',
                  mobileMessage: 'Unless you submitted your reviews elsewhere, your unsubmitted reviews will be lost.',
                  onConfirm: ignoreSubmissionErrors
                });
              }
            })
        }}
      />
    </>
  )
};

ReviewTopBar.propTypes = {
  demo: PropTypes.bool,
  stopDemo: PropTypes.func,
  logout: PropTypes.func,
  loadReviews: PropTypes.func,
  loadingReviews: PropTypes.bool,
  submissionQueue: PropTypes.array,
  submissionErrors: PropTypes.array,
  ignoreSubmissionErrors: PropTypes.func,
  retrySubmission: PropTypes.func,
  isQueueClear: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 28
  }
})

export default ReviewTopBar;
