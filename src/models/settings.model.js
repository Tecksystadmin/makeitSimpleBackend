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
      mobileNumber: ["+918957848236"],
      companyNickName: "MKT",
      companyName: "MAKE IT SIMPLE",
      companyLocation: "OPS Nagar,Kalindipuram, Prayagraj,Uttar Pradesh, 211011",
      companyTagLine: "Turn your Dream into Reality",
      companyLink: "https://makeitsimple.net.in/",
      companyAddress: "OPS Nagar,Kalindipuram, Prayagraj,Uttar Pradesh, 211011",
      companyEmail: "support@makeitsimple.net.in",
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
