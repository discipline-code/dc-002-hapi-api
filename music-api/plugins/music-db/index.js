'use strict';

const r = require('rethinkdb');

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
      console.log('Success connecting to RethinkDB'); 
      server.app.rConnection = conn;
    }
    next();
  });
};
exports.register.attributes = {
  pkg: require('./package')
};
