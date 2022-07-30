const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

const slidesSchema = mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            trim: true,
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        cards: [
            {
                title: { type: String },
                image: { type: String },
                link: { type: String },
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Slide = mongoose.model("Slide", slidesSchema);

module.exports = Slide;
