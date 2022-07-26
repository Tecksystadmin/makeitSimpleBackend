const httpStatus = require("http-status");
const { ScheduleDemo } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createScheduleDemo = async (ScheduleDemoBody) => {
  const scheduleDemo = await ScheduleDemo.create(ScheduleDemoBody);
  return scheduleDemo;
};

/**
 * Query for ScheduleDemos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryScheduleDemo = async (filter, options) => {
  const scheduleDemos = await ScheduleDemo.findOne();
  return scheduleDemos;
};

/**
 * Get ScheduleDemo by id
 * @param {ObjectId} id
 * @returns {Promise<ScheduleDemo>}
 */
const getScheduleDemoById = async (id) => {
  return ScheduleDemo.findById(id);
};

/**
 * Update ScheduleDemo by id
 * @param {ObjectId} scheduleDemoId
 * @param {Object} updateBody
 * @returns {Promise<ScheduleDemo>}
 */
const updateScheduleDemoById = async (scheduleDemoId, updateBody) => {
  const scheduleDemo = await getScheduleDemoById(scheduleDemoId);
  if (!scheduleDemo) {
    throw new ApiError(httpStatus.NOT_FOUND, "ScheduleDemo not found");
  }
  if (
    updateBody.email &&
    (await ScheduleDemo.isEmailTaken(updateBody.email, scheduleDemoId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(scheduleDemo, updateBody);
  await scheduleDemo.save();
  return scheduleDemo;
};

/**
 * Delete ScheduleDemo by id
 * @param {ObjectId} scheduleDemoId
 * @returns {Promise<ScheduleDemo>}
 */
const deleteScheduleDemoById = async (scheduleDemoId) => {
  const scheduleDemo = await getScheduleDemoById(scheduleDemoId);
  if (!scheduleDemo) {
    throw new ApiError(httpStatus.NOT_FOUND, "ScheduleDemo not found");
  }
  await scheduleDemo.remove();
  return scheduleDemo;
};

module.exports = {
  createScheduleDemo,
  queryScheduleDemo,
  getScheduleDemoById,
  updateScheduleDemoById,
  deleteScheduleDemoById,
};
