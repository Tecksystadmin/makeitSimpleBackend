const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { slidesService } = require("../services");

const createSlides = catchAsync(async (req, res) => {
  const slide = await slidesService.createSlides(req.body);
  res.status(httpStatus.CREATED).send(slide);
});

const getSlides = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await slidesService.querySlides(filter, options);
  res.send(result);
});

const getSlide = catchAsync(async (req, res) => {
  const slides = await slidesService.getSlideById(req.params.slidesId);
  if (!slides) {
    throw new ApiError(httpStatus.NOT_FOUND, "slides not found");
  }
  res.send(slides);
});

const updateSlides = catchAsync(async (req, res) => {
  const slides = await slidesService.updateSlidesById(
    req.params.slidesId,
    req.body
  );
  res.send(slides);
});

const deleteSlides = catchAsync(async (req, res) => {
  await slidesService.deleteSlidesById(req.params.slidesId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSlides,
  getSlides,
  getSlide,
  updateSlides,
  deleteSlides,
};
