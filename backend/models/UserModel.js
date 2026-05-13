const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role:{
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    services: {
      type: [String],
      default: [],
    },

     // documents field
  documents: {
    profilePhoto: {
      type: String,
      default: "",
    },
    panCard: {
      type: String,
      default: "",
    },
    skillDocs: {
      type: [String],
      default: [],
    },
  }
  }
);

module.exports = mongoose.model("users", userSchema);