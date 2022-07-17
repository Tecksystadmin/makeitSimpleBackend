const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { settingsService } = require("../services");

const updateSettings = catchAsync(async (req, res) => {
  const setting = await settingsService.updateSettings(
    req.params.settingId,
    req.body
  );
  res.send(setting);
});

const getSettings = catchAsync(async (req, res) => {
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await settingsService.querySettings(options);
  res.send(result);
});

module.exports = {
  updateSettings,
  getSettings,
};
