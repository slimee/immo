const { newPlan } = require('@forestadmin/context');

module.exports = newPlan()
  .addStep('env', (context) => context
    .addModule('dotenv', require('dotenv'))
    .with('dotenv', (dotenv) => dotenv.config())
    .addInstance('env', {...process.env})
  )
