const Fetcher = require("../technical/http/fetcher")

module.exports = context => context
  .addUsingClass('fetcher', Fetcher)
  .with('fetcher', (fetcher) => fetcher
    .addFetcher('request', () => { throw new Error('no request fetcher') })
    .addFetcher('response', () => { throw new Error('no response fetcher') }))
  .addFactoryFunction('fetchSearchParameters', ({ assertPresent, fetcher }) => {
    assertPresent({ fetcher });
    return () => fetcher.get('searchParameters');
  })

