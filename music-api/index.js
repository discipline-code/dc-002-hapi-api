'use strict';

const Hapi = require('hapi'); // Require hapi
// Create a new server object
const server = new Hapi.Server();
// Create array of plugins we want to register
const plugins = [
  {
    register: require('./plugins/test-plugin'),
    options: {
      option_a: 'production',
      option_b: 'http://www.google.com'
    }
  },
  {
    register: require('./plugins/music-db'),
    options: {
      host: process.env.RETHINK_MUSIC_PORT_28015_TCP_ADDR,
      port: process.env.RETHINK_MUSIC_PORT_28015_TCP_PORT,
      database: 'music_store'
    }
  }
];

// Adds an incoming server connection
server.connection({
  host: '0.0.0.0', // If you use localhost Docker won't expose the app
  port: 3000 // Make sure this port is not being used by any other app
});

// Register plugins
server.register(plugins, (err) => {
  if(err) {
    console.log('There was an error loading plugins...');
    console.log('Terminating...');
    console.log(err);
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/test',
    handler: (request, reply) => {
      reply('amazing!');
    }
  });
  // Start server
  server.start((err) => {
    if(err) {
      console.log('There was an error at server start...');
      console.log('Terminating...');
      console.log(err);
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});
