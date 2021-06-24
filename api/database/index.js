module.exports = plan => plan
  .addStep('database', (planDatabase) => planDatabase
    .addStep('db', require('./db'))
    .addStep('collections', require('./collections')));


