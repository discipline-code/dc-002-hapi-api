const vinylSchema = require('./schema.js');
const r = require('rethinkdb');

const create = {
  handler: (request, reply) => {
    const vinyl = request.payload; // Get payload
    r.db('music_store') // Specify db
      .table('vinyls')  // Specify table
      .insert(vinyl)    // Specify record
      .run(request.server.app.rConnection)  // Run query with server connection
      .then(res => reply(res)) // Reply with newly created object
      .catch(err => reply({ error: true }).code(500));  // Fail if something went wrong
  },
  validate: {
    payload: vinylSchema.create // Apply schema validation to payload
  }
};

const update = {
  handler: (request, reply) => {
    const vinylID = request.params.id;
    const payload = request.payload || {};
    r.db('music_store')
      .table('vinyls')
      .filter({ id: vinylID })
      .update(payload)
      .run(request.server.app.rConnection)
      .then(res => reply(res))
      .catch(err => reply('err').code(500));
  },
  validate: {
    payload: vinylSchema.update.required().min(1)
  }
};

const remove = {
  handler: (request, reply) => {
    const vinylID = request.params.id;
    r.db('music_store')
      .table('vinyls')
      .filter({ id: vinylID })
      .delete()
      .run(request.server.app.rConnection)
      .then(res => reply(res))
      .catch(err => reply('err').code(500));
  },
  validate: {
    params: { id: vinylSchema.vinylID }
  }
}

const read = {
  handler: (request, reply) => {
    const vinylID = request.params.id;
    r.db('music_store')
      .table('vinyls')
      .filter({ id: vinylID })
      .limit(1)
      .run(request.server.app.rConnection)
      .then(cursor => cursor.toArray())
      .then(results => {
        if(results.length === 0) {
          reply('Resource not found').code(404);
        } else {
          reply(results[0]);
        }
      })
      .catch(err => reply('error').code(500));
  },
  validate: {
    params: { id: vinylSchema.vinylID }
  }
}

const index = {
  handler: (request, reply) => {
    r.db('music_store')
      .table('vinyls')
      .run(request.server.app.rConnection)
      .then(cursor => cursor.toArray())
      .then(results => reply(results))
      .catch(err => reply({ data: err}).code(500));
  }
}

module.exports = { create, read, update, remove, index };
