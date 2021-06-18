const { newPlan } = require('@forestadmin/context');

module.exports = newPlan()
  .addStep('db', require('./db'))
  .addStep('collections', require('./collections'));


