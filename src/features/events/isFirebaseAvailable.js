import _ from 'lodash';

export default (
  !_.isNil(process.env.FIREBASE_API_KEY) &&
  !_.isNil(process.env.FIREBASE_PROJECT_ID)
);