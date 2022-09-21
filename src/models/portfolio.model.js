const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const portfolioSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    videoLink: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    videoStatus: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
portfolioSchema.plugin(toJSON);
portfolioSchema.plugin(paginate);

portfolioSchema.pre('save', async function (next) {
  const portfolio = this;
  if (portfolio.isModified('password')) {
    portfolio.password = await bcrypt.hash(portfolio.password, 8);
  }
  next();
});

/**
 * @typedef portfolio
 */
const portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = portfolio;
