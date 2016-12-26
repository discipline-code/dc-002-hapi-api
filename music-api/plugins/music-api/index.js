'use strict';
const vinyl = require('./vinyl');

exports.register = function (server, options, next) {
  server.route({ method: 'POST',    path: '/vinyls',          config: vinyl.create });
  server.route({ method: 'GET',     path: '/vinyls',          config: vinyl.index });
  server.route({ method: 'GET',     path: '/vinyls/{id}',     config: vinyl.read });
  server.route({ method: 'PATCH',   path: '/vinyls/{id}',     config: vinyl.update });
  server.route({ method: 'DELETE',  path: '/vinyls/{id}',     config: vinyl.remove });
  console.log('Success loading API plugin');
  next();
};

exports.register.attributes = {
    pkg: require('./package')
};
