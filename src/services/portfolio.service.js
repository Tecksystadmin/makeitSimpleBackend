const httpStatus = require('http-status');
const { Portfolio } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} portfolioBody
 * @returns {Promise<Portfolio>}
 */
const createPortfolio = async (portfolioBody) => {
  const portfolio = await Portfolio.create(portfolioBody);
  return { data: portfolio, code: 200, message: "Portfolio Submitted Successfully!" };
};

/**
 * Query for portfolios
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPortfolios = async (filter, options) => {
  const portfolios = await Portfolio.paginate(filter, options);
  return portfolios;
};


module.exports = {
  createPortfolio,
  queryPortfolios,
};
