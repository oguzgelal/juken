import _ from 'lodash';
import * as Analytics from 'expo-firebase-analytics';

export default async (user, callback) => {
  try {
    await Analytics.setUserId(_.get(user, 'data.id'));
    await Analytics.setUserProperties({
      username: _.get(user, 'data.username'),
      level: String(_.get(user, 'data.level')),
      startedAt: _.get(user, 'data.started_at'),
      subActive: String(_.get(user, 'data.subscription.active')),
      subType: _.get(user, 'data.subscription.type'),
      subEnds: _.get(user, 'data.subscription.period_ends_at'),
    });
    if (typeof callback === 'function') {
      callback();
    }
  } catch(e) {
    /** do nothing */
    console.log('Failed to capture user details', e);
  }
}