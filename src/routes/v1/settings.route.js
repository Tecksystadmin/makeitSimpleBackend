const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const settingValidation = require("../../validations/settings.validation");
const settingController = require("../../controllers/settings.controller");

const router = express.Router();

router
  .route("/")
  .get(validate(settingValidation.getSettings), settingController.getSettings);

router
  .route("/:settingId")
  .patch(
    validate(settingValidation.updateSettings),
    settingController.updateSettings
  );
module.exports = router;