const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    mobile: Joi.number().required(),
    requirement: Joi.string().allow('').allow(null),
    message: Joi.string().allow('').allow(null),
  }),
};

const getContacts = {
  query: Joi.object().keys({
    fullName: Joi.string(),
    emailAddress: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId),
  }),
};

const updateContact = {
  params: Joi.object().keys({
    contactId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        emailAddress: Joi.string().email(),
        fullName: Joi.string(),
    })
    .min(1),
};

const deleteContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};
