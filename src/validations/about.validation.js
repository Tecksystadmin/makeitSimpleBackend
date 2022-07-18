const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createAbout = {
  body: Joi.object().keys({
    aboutTitle: Joi.string().required(),
    aboutDescription: Joi.string().required(),
  }),
};

const getAbouts = {
  query: Joi.object().keys({
    aboutTitle: Joi.string(),
    aboutDescription: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAbout = {
  params: Joi.object().keys({
    aboutId: Joi.string().custom(objectId),
  }),
};

const updateAbout = {
  params: Joi.object().keys({
    aboutId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        aboutTitle: Joi.string(),
        aboutDescription: Joi.string()
    })
    .min(1),
};

const deleteAbout = {
  params: Joi.object().keys({
    aboutId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAbout,
  getAbouts,
  getAbout,
  updateAbout,
  deleteAbout
};
