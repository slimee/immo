module.exports = context => context
  .addFactoryFunction('start', ({assertPresent, startDatabase, startHTTP}) =>
    assertPresent({startDatabase, startHTTP})
    && (async () => {
      await startDatabase()
      await startHTTP()
    }))
