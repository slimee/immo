module.exports = (context) => context
  .addFactoryFunction('immoCollection', ({ assertPresent, collection }) => assertPresent({ collection }) && (() => collection('immo')))
