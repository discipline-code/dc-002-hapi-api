'use strict';

const r = require('rethinkdb');

const createDB = dbExists => {
  return r.branch(
    dbExists,
    { dbs_created: 0 },
    r.dbCreate('music_store')
  );
};

const createTable = tableExists => {
  return r.branch(
    tableExists,
    { tables_created: 0 },
    r.db('music_store').tableCreate('vinyls')
  );
};

exports.register = function (server, options, next) {
  const dbOptions = {
    host: options.host,
    port: options.port
  };
  r.connect(dbOptions, (err, conn) => {
    if (err) {
      console.log('Error connecting to RethinkDB');
      throw err;
    }
    else  {
      console.log('Success connecting to RethinkDB :)'); 
      r.dbList().contains('music_store')
        .do(createDB)
        .run(conn)
        .then(dbExists => {
          console.log(dbExists);
          return r.db('music_store').tableList().contains('vinyls')
          .do(createTable) 
          .run(conn);
        })
        .then(tableExists => {
          console.log(tableExists);
          server.app.rConnection = conn;
        });
    }
    next();
  });
};

exports.register.attributes = {
  pkg: require('./package')
};
