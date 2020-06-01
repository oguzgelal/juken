import { Alert } from 'react-native';
import device from 'src/utils/device';

export default ({
  title,
  webTitle,
  mobileTitle,
  mobileMessage,
  onConfirm,
}) => {

  const hasConfirm = (
    typeof onConfirm === 'function'
  );

  if (device('web')) {
    if (hasConfirm) {
      if (confirm(title || webTitle)) onConfirm();
    } else {
      alert(title || webTitle);
    }
  } else {
    Alert.alert(
      title || mobileTitle,
      mobileMessage,
      !hasConfirm ? null : [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => onConfirm() },
      ])
  }
}