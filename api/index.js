const fetch = require('node-fetch');
const { execute, makeWriteFilesystem } = require('@forestadmin/context');
const env = require('./env');
const http = require('./http');
const database = require('./database');
const business = require('./business');
const httpToBusiness = require('./http-to-business')
const start = require('./start');

const myImmoApp = execute([
  env,
  http,
  database,
  business,
  httpToBusiness,
  start,
  (plan) => plan.addMetadataHook(makeWriteFilesystem(__dirname, 'generated')),
]);

myImmoApp
  .start()
  .then(async () => {
    await fetch(`http://localhost:${myImmoApp.getHTTPPort()}/api/search`)
      .then(response => response.json())
      .then(data => console.log(data));
  });
