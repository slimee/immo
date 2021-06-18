const search = require('./search')

module.exports = context => context
  .addFactoryFunction('search', search);
