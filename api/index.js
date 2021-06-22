const { execute } = require('@forestadmin/context');
const env = require('./env');
const web = require('./web');
const database = require('./database');
const business = require('./business');
const httpToBusinessAdapter = require('./http-to-business-adapter')
const start = require('./start');

const myImmoApp = execute([
  env,
  web,
  database,
  business,
  httpToBusinessAdapter,
  start,
]);

myImmoApp.start();
