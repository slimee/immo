const { newPlan } = require('@forestadmin/context');
const makeLibs = require('./make-libs');
const makeFetcher = require('./make-fetcher');
const makeExpress = require('./make-express');
const makeCommands = require('./make-commands');

module.exports = newPlan()
  .addStep('libs', makeLibs)
  .addStep('fetcher', makeFetcher)
  .addStep('express', makeExpress)
  .addStep('commands', makeCommands);
