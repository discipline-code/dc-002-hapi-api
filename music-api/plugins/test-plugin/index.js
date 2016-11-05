const plugin = function (server, options, next) {
  server.route({
    path: '/welcome',
    method: 'GET',
    handler:(request,reply)=>{
      reply({
        message: 'A plugin with options',
        options: options
      })
    }
  });
  next();
};
plugin.attributes = { name: 'the-name-of-the-plugin', version: '0.0.1' };
module.exports = plugin;
