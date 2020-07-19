import _ from 'lodash';
import { useStoreState } from 'easy-peasy';
import { useColorScheme } from 'react-native-appearance';
import { DARK_MODE } from 'src/common/constants';

export default () => {
  const colorScheme = useColorScheme();
  const userSettings = useStoreState(state => state.session.userSettings);
  const forceDark = _.get(userSettings, DARK_MODE);

  if (forceDark) return 'dark';
  return colorScheme;
}