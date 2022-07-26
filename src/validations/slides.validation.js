const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSlides = {
  body: Joi.object().keys({
    heading: Joi.string().required(),
    link: Joi.string().required(),
    topic: Joi.string().required(),
    description: Joi.string().required(),
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
