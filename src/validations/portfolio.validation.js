const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPortfolio = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    category: Joi.string().required(),
    videoLink: Joi.string().allow('').allow(null),
    image: Joi.string().allow('').allow(null),
    videoStatus: Joi.boolean().allow('').allow(null),
    slug: Joi.string().allow('').allow(null),
  }),
};

const getPortfolios = {
  query: Joi.object().keys({
    fullName: Joi.string(),
    emailAddress: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPortfolio = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePortfolio = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      emailAddress: Joi.string().email(),
      fullName: Joi.string(),
    })
    .min(1),
};

const deletePortfolio = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
};
