const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const portfolioValidation = require('../../validations/portfolio.validation');
const portfolioController = require('../../controllers/portfolio.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(portfolioValidation.createPortfolio), portfolioController.createPortfolio)
  .get(validate(portfolioValidation.getPortfolios), portfolioController.getPortfolios);


module.exports = router;
