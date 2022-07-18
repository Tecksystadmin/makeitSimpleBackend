const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bannerService } = require('../services');

const createBanner = catchAsync(async (req, res) => {
  const Banner = await bannerService.createBanner(req.body);
  res.status(httpStatus.CREATED).send(Banner);
});

const getBanners = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bannerService.queryBanners(filter, options);
  res.send(result);
});

const getBanner = catchAsync(async (req, res) => {
  const Banner = await bannerService.getBannerById(req.params.BannerId);
  if (!Banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  res.send(Banner);
});

const updateBanner = catchAsync(async (req, res) => {
  const Banner = await bannerService.updateBannerById(req.params.BannerId, req.body);
  res.send(Banner);
});

const deleteBanner = catchAsync(async (req, res) => {
  await bannerService.deleteBannerById(req.params.BannerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
};
