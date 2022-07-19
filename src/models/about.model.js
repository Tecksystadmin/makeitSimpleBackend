const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

const aboutSchema = mongoose.Schema(
  {
    aboutTitle: {
      type: String,
      required: true,
      trim: true,
    },
    aboutDescription: {
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

const About = mongoose.model("About", aboutSchema);

module.exports = About;
