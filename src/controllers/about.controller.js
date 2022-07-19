const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { aboutService } = require("../services");

const createAbout = catchAsync(async (req, res) => {
  const about = await aboutService.createAbout(req.body);
  res.status(httpStatus.CREATED).send(about);
});

const getAbouts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await aboutService.queryAbouts(filter, options);
  res.send(result);
});

const getAbout = catchAsync(async (req, res) => {
  const about = await aboutService.getAboutById(req.params.aboutId);
  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, "About not found");
  }
  res.send(about);
});

const updateAbout = catchAsync(async (req, res) => {
  const About = await aboutService.updateAboutById(
    req.params.aboutId,
    req.body
  );
  res.send(About);
});

const deleteAbout = catchAsync(async (req, res) => {
  await aboutService.deleteAboutById(req.params.aboutId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAbout,
  getAbouts,
  getAbout,
  updateAbout,
  deleteAbout,
};
