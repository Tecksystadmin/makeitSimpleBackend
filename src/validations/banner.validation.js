const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createBanner = {
  body: Joi.object().keys({
    bannerImage: Joi.string().required(),
    bannerText: Joi.string().required(),
  }),
};

const getBanners = {
  query: Joi.object().keys({
    bannerImage: Joi.string(),
    bannerText: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string().custom(objectId),
  }),
};

const updateBanner = {
  params: Joi.object().keys({
    bannerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        bannerImage: Joi.string(),
        bannerText: Joi.string()
    })
    .min(1),
};

const deleteBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
