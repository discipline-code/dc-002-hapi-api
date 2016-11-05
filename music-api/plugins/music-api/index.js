'use strict';

exports.register = function (server, options, next) {
  server.route({ method: 'POST',    path: '/vinyls',          config: require('./vinyl').create });
  server.route({ method: 'GET',     path: '/vinyls',          config: require('./vinyl').index });
  server.route({ method: 'GET',     path: '/vinyls/{id}',     config: require('./vinyl').read });
  server.route({ method: 'PATCH',   path: '/vinyls/{id}',     config: require('./vinyl').update });
  server.route({ method: 'DELETE',  path: '/vinyls/{id}',     config: require('./vinyl').remove });
  next();
};

exports.register.attributes = {
    pkg: require('./package')
};
