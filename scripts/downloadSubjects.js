const _ = require('lodash');
const qs = require('qs');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getApiKey = resolve => {
  rl.question('Enter your WaniKani API Key v2: ', apiKey => {
    if (!apiKey) return getApiKey(resolve);
    rl.close();
    resolve(apiKey);
  });
}

const getInput = () => new Promise(resolve => {
  getApiKey(resolve);
})

const fetch = async ({ params = {}, apiKey, url }) => {
  return await axios({
    url: url || 'https://api.wanikani.com/v2/subjects',
    method: 'get',
    headers: { Authorization: `Bearer ${apiKey}` },
    paramsSerializer: params => qs.stringify(params, { encoder: s => s }),
    params,
  });
}

const download = async (apiKey, data = [], nextUrl) => {
  console.log('🌎 Downloading chunk...');
  const res = await fetch({ apiKey, url: nextUrl }) || {};
  const subjects = data.concat(_.get(res, 'data.data') || []);
  const next = _.get(res, 'data.pages.next_url');
  if (next) {
    return await download(apiKey, subjects, next);
  } else {
    console.log('🌎 Downloaded subjects: ', subjects.length)
    return subjects.map(s => ({ [s.id]: s }));
  }
}

const write = async dict => {
  const OUT = path.join(__dirname + '/../src/lib/subjects.json');
  console.log('💾 Preparing...')
  await fs.remove(OUT);
  console.log('💾 Writing to file...')
  await fs.outputJson(OUT, dict)
}

const main = async () => {
  await write(
    await download(
      await getInput()));

  process.exit();
}

main(); 