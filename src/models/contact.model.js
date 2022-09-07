const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    requirement: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

contactSchema.pre('save', async function (next) {
  const contact = this;
  if (contact.isModified('password')) {
    contact.password = await bcrypt.hash(contact.password, 8);
  }
  next();
});

/**
 * @typedef contact
 */
const contact = mongoose.model('contact', contactSchema);

module.exports = contact;
