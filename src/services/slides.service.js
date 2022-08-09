const httpStatus = require("http-status");
const { Slides } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createSlides = async (SlidesBody) => {
  const slides = await Slides.create(SlidesBody);
  return slides;
};

/**
 * Query for Slidess
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySlides = async (filter, options) => {
  const slides = await Slides.find();
  return slides;
};

/**
 * Get Slides by id
 * @param {ObjectId} id
 * @returns {Promise<Slides>}
 */
const getSlidesById = async (id) => {
  return Slides.findById(id);
};

/**
 * Update Slides by id
 * @param {ObjectId} SlidesId
 * @param {Object} updateBody
 * @returns {Promise<Slides>}
 */
const updateSlidesById = async (slidesId, updateBody) => {
  const slides = await getSlidesById(slidesId);
  if (!slides) {
    throw new ApiError(httpStatus.NOT_FOUND, "Slides not found");
  }
  if (
    updateBody.email &&
    (await Slides.isEmailTaken(updateBody.email, SlidesId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(slides, updateBody);
  await slides.save();
  return slides;
};

/**
 * Delete Slides by id
 * @param {ObjectId} SlidesId
 * @returns {Promise<Slides>}
 */
const deleteSlidesById = async (slidesId) => {
  const slides = await getSlidesById(slidesId);
  if (!slides) {
    throw new ApiError(httpStatus.NOT_FOUND, "Slides not found");
  }
  await slides.remove();
  return slides;
};

module.exports = {
  createSlides,
  querySlides,
  getSlidesById,
  updateSlidesById,
  deleteSlidesById,
};
