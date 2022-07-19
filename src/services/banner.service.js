const httpStatus = require("http-status");
const { Banner } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createBanner = async (BannerBody) => {
  const banner = await Banner.create(BannerBody);
  return banner;
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
const queryBanners = async (filter, options) => {
  const banners = await Banner.findOne();
  return banners;
};

/**
 * Get Banner by id
 * @param {ObjectId} id
 * @returns {Promise<Banner>}
 */
const getBannerById = async (id) => {
  return Banner.findById(id);
};

/**
 * Update Banner by id
 * @param {ObjectId} BannerId
 * @param {Object} updateBody
 * @returns {Promise<Banner>}
 */
const updateBannerById = async (bannerId, updateBody) => {
  const banner = await getBannerById(bannerId);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }
  if (
    updateBody.email &&
    (await Banner.isEmailTaken(updateBody.email, BannerId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(banner, updateBody);
  await banner.save();
  return banner;
};

/**
 * Delete Banner by id
 * @param {ObjectId} BannerId
 * @returns {Promise<Banner>}
 */
const deleteBannerById = async (bannerId) => {
  const banner = await getBannerById(bannerId);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }
  await banner.remove();
  return banner;
};

module.exports = {
  createBanner,
  queryBanners,
  getBannerById,
  updateBannerById,
  deleteBannerById,
};
