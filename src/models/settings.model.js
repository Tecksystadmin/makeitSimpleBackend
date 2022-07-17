const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const settingSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
    },
    companyNickName: {
      type: String,
      trim: true,
    },
    companyTagLine: {
      type: String,
      trim: true,
    },
    companyLink: {
      type: String,
      trim: true,
    },
    companyEmail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    favicon: {
      type: String,
      trim: true,
    },
    companyLogo: {
      type: String,
      trim: true,
    },
    companyLocation: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: Array,
      trim: true,
    },
    socialMedia: [
      {
        platform: String,
        name: String,
        link: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
settingSchema.plugin(toJSON);
settingSchema.plugin(paginate);

/**
 * @typedef Setting
 */
const Setting = mongoose.model("Setting", settingSchema);
async function inIt() {
  var success = await Setting.count({});
  // console.log('CATEGORY success===', success)
  if (success == 0) {
    await new Setting({
      mobileNumber: ["8303999849", "9648377181", "9580038997"],
      companyNickName: "MKT",
      companyName: "Make It Simple",
      companyLocation: "In front of Gautam Cinema, Katghar, Prayagraj - 211003",
      companyTagLine: "Turn your Dream into Reality",
      companyLink: "www.makeitsimple.com",
      companyAddress: "1039 A Dariyabad Prayagraj",
      companyEmail: "admin@tecksyst.com",
      socialMedia: [
        {
          platform: "instagram",
          name: "Instagram",
          link: "https://www.instagram.com/tecksyst_/",
        },
        {
          platform: "facebook",
          name: "Facebook",
          link: "https://www.facebook.com/tecksyst",
        },
        {
          platform: "linkedin",
          name: "Linkedin",
          link: "https://www.linkedin.com/in/tecksyst-technology-74b728241",
        },
      ],
    }).save();
  }
}

inIt();
module.exports = Setting;
