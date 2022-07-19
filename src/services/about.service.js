const httpStatus = require("http-status");
const { About } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createAbout = async (AboutBody) => {
  const about = await About.create(AboutBody);
  return about;
};

/**
 * Query for Banners
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAbouts = async (filter, options) => {
  const abouts = await About.findOne();
  return abouts;
};

/**
 * Get Banner by id
 * @param {ObjectId} id
 * @returns {Promise<Banner>}
 */
const getAboutById = async (id) => {
  return About.findById(id);
};

/**
 * Update Banner by id
 * @param {ObjectId} AboutId
 * @param {Object} updateBody
 * @returns {Promise<Banner>}
 */
const updateAboutById = async (AboutId, updateBody) => {
  const about = await getAboutById(AboutId);
  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, "About not found");
  }

  Object.assign(about, updateBody);
  await about.save();
  return about;
};

/**
 * Delete Banner by id
 * @param {ObjectId} AboutId
 * @returns {Promise<Banner>}
 */
const deleteAboutById = async (AboutId) => {
  const about = await getAboutById(AboutId);
  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, "About not found");
  }
  await about.remove();
  return about;
};

module.exports = {
  createAbout,
  queryAbouts,
  getAboutById,
  updateAboutById,
  deleteAboutById,
};
