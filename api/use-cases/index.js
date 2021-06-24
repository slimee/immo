const search = require('./search')

module.exports = plan => plan
  .addStep('useCases', useCasesPlan => useCasesPlan
    .addFactoryFunction('search', search));
