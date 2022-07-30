const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSlides = {
  body: Joi.object().keys({
    heading: Joi.string().required(),
    link: Joi.string().allow().allow(null),
    description: Joi.string().required(),
    shortDescription: Joi.string().allow().allow(null),
    cards: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      image: Joi.string().required(),
      link: Joi.string().allow().allow(null),
    }))
  }),
};

const getSlides = {
  query: Joi.object().keys({
    heading: Joi.string(),
    topic: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSlide = {
  params: Joi.object().keys({
    slidesId: Joi.string().custom(objectId),
  }),
};

const updateSlides = {
  params: Joi.object().keys({
    slidesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      heading: Joi.string(),
      link: Joi.string(),
      topic: Joi.string(),
      description: Joi.string()
    })
    .min(1),
};

const deleteSlides = {
  params: Joi.object().keys({
    slidesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSlides,
  getSlides,
  getSlide,
  updateSlides,
  deleteSlides,
};
