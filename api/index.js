const { execute } = require('@forestadmin/context');
const env = require('./env');
const web = require('./web');
const database = require('./database');
const business = require('./business');
const webAdapters = require('./web-adapters')
const start = require('./start');

const myImmoApp = execute([
  env,
  web,
  database,
  business,
  webAdapters,
  start,
]);

myImmoApp.start();
