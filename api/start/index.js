module.exports = plan => plan
  .addFactoryFunction('start', ({assertPresent, startDatabase, startHTTP}) =>
    assertPresent({startDatabase, startHTTP})
    && (async () => {
      await startDatabase()
      await startHTTP()
    }));
