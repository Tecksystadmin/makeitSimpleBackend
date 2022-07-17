const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const updateSettings = {
  body: Joi.object().keys({
    companyName: Joi.string().required(),
    companyNickName: Joi.string().required(),
    companyTagLine: Joi.string().required(),
    companyLink: Joi.string().required(),
    companyEmail: Joi.string().required().email(),
    favicon: Joi.string().allow('').allow(null),
    companyLogo: Joi.string().allow('').allow(null),
    socialMedia: Joi.array().allow(),
    mobileNumber: Joi.array().allow(),
  }),
};

const getSettings = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  updateSettings,
  getSettings,
  getUser,
  updateUser,
  deleteUser,
};