const { MongoClient } = require('mongodb')
const debug = require('debug')('api:mongo')

class Mongo {
  constructor({ assertPresent, dbConnectionString, dbName }){
    assertPresent({ dbConnectionString, dbName });
    this.dbConnectionString = dbConnectionString;
    this.dbName = dbName;
    this.database = null;
  }
  connect(){
    return this.database && Promise.resolve(this.database)
      ||
      Promise.resolve(this.dbConnectionString)
        .then(url => {
          debug(`CONNECTING TO %o`, url)
          return MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        })
        .then(client => {
          debug('CONNECTED')
          this.database = client.db(this.dbName)
        })
  }
  collection(name){
    return this.database.collection(name);
  }
}

module.exports = (context) => context
  .addUsingClass('mongo', Mongo, { private: true })
  .addFactoryFunction('startDatabase', ({ assertPresent, mongo }) => assertPresent({ mongo }) && (() => mongo.connect()))
  .addFactoryFunction('collection', ({ assertPresent, mongo }) => assertPresent({ mongo }) && ((name) => mongo.collection(name)))
