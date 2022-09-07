const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContact)
  .get(auth('getContacts'), validate(contactValidation.getContacts), contactController.getContacts);


module.exports = router;
