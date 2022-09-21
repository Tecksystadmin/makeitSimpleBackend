const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { portfolioService } = require('../services');

const createPortfolio = catchAsync(async (req, res) => {
  console.log("🚀 ~ file: portfolio.controller.js ~ line 8 ~ createPortfolio ~ req", req.body̵̵)
  const portfolio = await portfolioService.createPortfolio(req.body);
  res.status(httpStatus.CREATED).send(portfolio);
});

const getPortfolios = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await portfolioService.queryPortfolios(filter, options);
  res.send(result);
});

const getPortfolio = catchAsync(async (req, res) => {
  const portfolio = await portfolioService.getPortfolioById(req.params.portfolioId);
  if (!portfolio) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio not found');
  }
  res.send(portfolio);
});

const updateUser = catchAsync(async (req, res) => {
  const portfolio = await portfolioService.updateUserById(req.params.portfolioId, req.body);
  res.send(portfolio);
});

const deleteUser = catchAsync(async (req, res) => {
  await portfolioService.deleteUserById(req.params.portfolioId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updateUser,
  deleteUser,
};
