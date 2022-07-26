const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createScheduleDemo = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    message: Joi.string().required(),
}),
};

const getScheduleDemos = {
  query: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getScheduleDemo = {
  params: Joi.object().keys({
    scheduleDemoId: Joi.string().custom(objectId),
  }),
};

const updateScheduleDemo = {
  params: Joi.object().keys({
    scheduleDemoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        bannerImage: Joi.string(),
        bannerText: Joi.string()
    })
    .min(1),
};

const deleteScheduleDemo = {
  params: Joi.object().keys({
    scheduleDemoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createScheduleDemo,
  getScheduleDemos,
  getScheduleDemo,
  updateScheduleDemo,
  deleteScheduleDemo,
};
