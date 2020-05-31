import _ from 'lodash';
import * as env from 'src/common/env';
import queryString from 'src/utils/queryString';
import { GET } from 'src/common/constants';
import run from 'src/utils/run';

export default async (method, url, opts = {}) => {

  const {
    body = {},
    params = {},
    headers,
    hasError,
  } = opts;
  
  // construct url
  const finalUrl = `${url}${queryString(params)}`;

  try {
    
    // construct options
    const opts = { method, headers };
    if (body && method !== GET) {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    
    // log request
    if (env.DEBUG) console.log(`🌎 [${method}]: `, finalUrl, opts);
    
    // make the request
    const response = await fetch(finalUrl, opts);
    const data = await response.json();

    // accept a custom function to evaluate the response
    // and see if the request actually failed despite
    // the success response of status 200 OK
    const e = run(hasError, data);
    if (e) throw (e);
    
    // log request
    if (env.DEBUG) console.log(`🌕 [${method}]: `, finalUrl, data);

    // return response
    return data;

  } catch(err) {

    // log error
    if (env.DEBUG) console.log(`🌑 [${method}]: `, finalUrl, err);

    // throw the error
    throw(err);
  }
}