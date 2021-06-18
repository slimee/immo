const { AsyncLocalStorage } = require('async_hooks');

module.exports = class Fetcher {
  constructor() {
    this._fetchers = {};
    this.asyncLocalStorage = new AsyncLocalStorage();
  }

  addFetcher(fetchKey, fetchWork, preFetchersKeys) {
    if (!fetchKey) throw new Error('missing fetchKey');
    if (!fetchWork) throw new Error('missing fetchWork');

    const preFetchers = this._makePrefetchers(preFetchersKeys);
    const fetcher = this._makeFetcher(fetchKey, fetchWork, preFetchers);
    this._setFetcher(fetchKey, fetcher);
    return this;
  }

  _makePrefetchers(preFetchKeys) {
    const preFetchersList = preFetchKeys
      ? preFetchKeys.map((preFetchKey) => this.getFetcher(preFetchKey))
      : [];
    const preFetchers = {};
    preFetchersList.forEach((preFetch, index) => {
      preFetchers[preFetchKeys[index]] = preFetch;
    });
    return preFetchers;
  }

  _setFetcher(fetchKey, fetcher) {
    if (this._fetchers[fetchKey]) throw new Error(`already existing fetcher ${fetchKey}`);
    this._fetchers[fetchKey] = fetcher;
  }

  getFetcher(fetcherKey) {
    const fetcher = this._fetchers[fetcherKey];
    if (!fetcher) throw new Error(`missing fetcher "${fetcherKey}"`);
    return fetcher;
  }

  _makeFetcher(fetchKey, fetchWork, preFetchers) {
    const preFetchersList = Object.values(preFetchers);
    const preFetchersKeys = Object.keys(preFetchers);

    return async () => {
      const cacheResult = this._get(fetchKey);
      if (cacheResult) return cacheResult;

      // invoke all the preFetchers and pack the results {'key1':'result1'} for fetchWork
      const preFetchersResultsList = await Promise.all(preFetchersList
        .map((preFetch) => preFetch()));
      const preFetchersResults = {};
      preFetchersResultsList.forEach((preFetcherResult, index) => {
        preFetchersResults[preFetchersKeys[index]] = preFetcherResult;
      });

      const fetcherResult = await fetchWork(preFetchersResults);
      this._set(fetchKey, fetcherResult);
      return this._get(fetchKey);
    };
  }

  /**
   * Will find and run the fetcher matching key.
   * If a result for this key is found in cache, no fetcher is executed.
   */
  async get(fetchKey) {
    if (!fetchKey) throw new Error('missing fetchKey');
    const existingValue = this._get(fetchKey);
    if (existingValue) return existingValue;

    return this.getFetcher(fetchKey)();
  }

  /**
   * Function to be used to get a value if it has been previously computed
   * if it's not the case, it just returns undefined
   * @template T
   * @param {string} fetchKey
   * @returns {T | undefined}
   */
  // eslint-disable-next-line class-methods-use-this
  getIfComputed(fetchKey) {
    if (!fetchKey) throw new Error('missing fetchKey');
    return this._get(fetchKey);
  }

  init(initialKeys = {}) {
    this.asyncLocalStorage.enterWith(initialKeys);
  }

  _get(key) {
    const store = this.asyncLocalStorage.getStore();
    if (!store) throw new Error('fetch store is missing. Initialize it with fetcher.init(...)');
    return store[key];
  }

  _set(key, value) {
    const store = this.asyncLocalStorage.getStore();
    store[key] = value;
  }
};
