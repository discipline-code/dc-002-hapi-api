const Joi = require('joi');

const track = Joi.object().keys({
  number: Joi.number().integer().required(),
  title: Joi.string().min(1).max(30).required(),
  length: Joi.number().required()
});

const create = Joi.object().keys({
  artist: Joi.string().min(1).max(30).required(),
  title: Joi.string().min(1).max(30).required(),
  genre: Joi.string().min(1).max(30).required(),
  style: Joi.string().min(1).max(30).required(),
  year: Joi.number().integer().min(1900).max(2020).required(),
  rating: Joi.number().min(0).max(5).required(),
  tracklist: Joi.array().items(track).required()
});

const update = Joi.object().keys({
  artist: Joi.string().min(1).max(30),
  title: Joi.string().min(1).max(30),
  genre: Joi.string().min(1).max(30),
  style: Joi.string().min(1).max(30),
  year: Joi.number().integer().min(1900).max(2020),
  rating: Joi.number().min(0).max(5),
  tracklist: Joi.array().items(track)
})

const vinylID = Joi.string().guid();


module.exports = {
  create,
  update,
  vinylID
};
