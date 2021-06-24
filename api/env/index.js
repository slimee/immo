const debug = require('debug')('api:env')

module.exports = plan => plan
  .addStep('env', (plan) => plan
    .addModule('dotenv', require('dotenv').config())
    .addInstance('dbName', process.env.DB_NAME)
    .addInstance('dbConnectionString', process.env.DB_CONNECTION_STRING)
  )
