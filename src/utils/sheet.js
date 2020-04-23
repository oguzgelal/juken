import merge from 'lodash/merge';
import os from 'src/utils/os';

export default ({
  base = {},
  web = {},
  mobile = {},
  ios = {},
  android = {},
}) => {
  if (os('desktop')) return merge({}, base, web);
  if (os('ios')) return merge({}, base, mobile, ios);
  if (os('android')) return merge({}, base, mobile, android);
}