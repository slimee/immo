const makeLibs = require('./make-libs');
const makeFetcher = require('./make-fetcher');
const makeExpress = require('./make-express');
const makeCommands = require('./make-commands');

module.exports = plan => plan
  .addStep('HTTP', planHTTP => planHTTP
    .addStep('libs', makeLibs)
    .addStep('fetcher', makeFetcher)
    .addStep('express', makeExpress)
    .addStep('commands', makeCommands));
