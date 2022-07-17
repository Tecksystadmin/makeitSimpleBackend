const httpStatus = require("http-status");
const { Settings } = require("../models");
const ApiError = require("../utils/ApiError");

const querySettings = async (options) => {
  const setting = await Settings.find();
  console.log(setting);
  return setting;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getSettingById = async (id) => {
  return Settings.findById(id);
};

const updateSettings = async (settingId, updateBody) => {
  const setting = await getSettingById(settingId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    updateBody.email &&
    (await Settings.isEmailTaken(updateBody.email, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(setting, updateBody);
  await Settings.save();
  return setting;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

module.exports = {
  querySettings,
  getSettingById,
  updateSettings,
};
