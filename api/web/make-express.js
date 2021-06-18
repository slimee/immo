const makeExpressMiddlewares = require('../technical/http/make-express-middlewares')

module.exports = (context) => context
  .addFactoryFunction('app', ({assertPresent, express}) => {
    assertPresent({express})
    return express()
  })
  .addFactoryFunction('addHTTPEndpoint', ({assertPresent, app, fetcher}) =>
    assertPresent({app, fetcher})
    && ((method, path, ...callStack) =>
      app[method.toLowerCase()](
        path,
        (request, response, next) => {
          fetcher.init({request, response});
          next();
        },
        ...makeExpressMiddlewares(callStack))))
