const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

const bannerSchema = mongoose.Schema(
  {
    bannerImage: {
      type: String,
      required: true,
      trim: true,
    },
    bannerText: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
