import React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet } from 'react-native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import { useActionSheet } from '@expo/react-native-action-sheet';
import useNetworkListener from 'src/hooks/useNetworkListener';
import TopBar from 'src/components/TopBar/TopBar';
import Badge from 'src/components/Badge/Badge';
import theme from 'src/common/theme';
import device from 'src/utils/device';

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

  const uploadCompleted = submissionQueue.length === 0;
  const uploadQueue = submissionQueue.length;
  const uploadErrors = submissionErrors.length;

  let badgeColor = null;
  if (uploadCompleted) badgeColor = theme.palette.green;
  if (uploadQueue > 0) badgeColor = 'rgba(0, 0, 0, .1)';
  if (uploadErrors > 0) badgeColor = theme.palette.red;
  
  let badgeIcon = null;
  if (uploadCompleted) badgeIcon = <AntDesign name="check" size={10} color="white" />;
  if (uploadQueue > 0) badgeIcon = <AntDesign name="arrowup" size={10} color="white" />;

  return (
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
            if (device('web')) {
              if (confirm('Half completed reviews will be lost. Are you sure ?')) {
                loadReviews()
              }
            }
            else {
              Alert.alert('Are you sure ?', 'Half completed reviews will be lost', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => loadReviews() },
            ])
            }
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
    />
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
