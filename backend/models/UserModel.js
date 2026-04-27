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

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true, 
    },

    services: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  
);

module.exports = mongoose.model("User", userSchema);
