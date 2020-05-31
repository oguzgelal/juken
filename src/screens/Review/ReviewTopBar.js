import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import { useActionSheet } from '@expo/react-native-action-sheet';
import useNetworkListener from 'src/hooks/useNetworkListener';
import TopBar from 'src/components/TopBar/TopBar';
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
}) => {

  const isInternetReachable = useNetworkListener();
  const { showActionSheetWithOptions } = useActionSheet();

  const uploadSuccess = submissionQueue.length === 0;
  const uploadFail = submissionErrors.length > 0;
  const uploadQueue = submissionQueue.length;
  const uploadErrors = submissionErrors.length;

  let badgeColor = null;
  if (uploadSuccess) badgeColor = theme.palette.green;
  if (uploadQueue > 0) badgeColor = 'rgba(0, 0, 0, .1)';
  if (uploadErrors > 0) badgeColor = theme.palette.red;
  
  let badgeIcon = null;
  if (uploadSuccess) badgeIcon = <AntDesign name="check" size={10} color="white" />;
  if (uploadQueue > 0) badgeIcon = <AntDesign name="arrowup" size={10} color="white" />;

  return (
    <>
      <TopBar
        style={styles.wrapper}
        centerText="Reviews"
        left={<Entypo name="menu" size={20} color="white" />}
        leftOnPress={() => {
          showActionSheetWithOptions({
            options: [
              'Cancel',
              'Refresh',
              'Logout',
            ],
            destructiveButtonIndex: 2,
          }, buttonIndex => {
            if (buttonIndex === 1) {
              dialog({
                webTitle: 'Half completed reviews will be lost. Are you sure ?',
                mobileTitle: 'Are you sure ?',
                mobileMessage: 'Half completed reviews will be lost',
                onConfirm: loadReviews
              });
            }
            if (buttonIndex === 2) {
              if (demo) stopDemo();
              else logout();
            }
          })
        }}
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
              text={(uploadQueue > 0) ? uploadQueue : null}
              icon={badgeIcon}
            />
          </>
        }
        rightOnPress={() => {
          if (!uploadFail) {
            dialog({ title: 'All reviews are submitted successfully!' });
          } else {
            showActionSheetWithOptions({
              options: [
                'Cancel',
                `Retry submitting ${uploadErrors} reviews`,
                `Ignore ${uploadErrors} reviews`,
              ],
              destructiveButtonIndex: 2,
              title: `Unable to submit ${uploadErrors} reviews`,
              message: (
                'You can retry submission after making sure your device ' +
                'have an active internet connection. If you submitted the reviews ' +
                'from another application, please use the Ignore button to dismiss ' +
                'the errors.'
              ),
            })
          }
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
  submissionQueue: PropTypes.array,
  submissionErrors: PropTypes.array,
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 28
  }
})

export default ReviewTopBar;
