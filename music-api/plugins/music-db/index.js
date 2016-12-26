'use strict';

const r = require('rethinkdb');
const seed = require('./seed');

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

const seedTable = a => {
  console.log(a);
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
          return r.db('music_store').tableList()
            .contains('vinyls')
            .do(createTable) 
            .run(conn);
        })
        .then(tableExists => {
          return r.db('music_store')
            .table('vinyls')
            .run(conn)
            .then(cursor => cursor.toArray())
            .then(results => results.length);
        })
        .then(tableEmpty => {
          if(!!!tableEmpty) {
            console.log('seeding database...');
            return r.db('music_store') // Specify db
              .table('vinyls')  // Specify table
              .insert(seed)    // Specify records
              .run(conn)  // Run query with server connection
          } else {
            return [];
          }
        })
        .then(() => {
          server.app.rConnection = conn;
          console.log('Connection object created');
        })
        .catch(err => {
          console.log('There seems to be an error with db startup :(');
          console.log(err);
        });
    }
    next();
  });
};

exports.register.attributes = {
  pkg: require('./package')
};
