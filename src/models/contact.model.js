const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: Number,
      required: true,
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
