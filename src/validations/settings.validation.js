const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const updateSettings = {
  params: Joi.object().keys({
    settingId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      companyName: Joi.string(),
      companyNickName: Joi.string(),
      companyTagLine: Joi.string(),
      companyLink: Joi.string(),
      companyEmail: Joi.string().email(),
      favicon: Joi.string().allow("").allow(null),
      companyLogo: Joi.string().allow("").allow(null),
      socialMedia: Joi.array().allow(),
      mobileNumber: Joi.array().allow(),
    })
    .min(1),
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
