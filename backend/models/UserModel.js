const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    workerVerificationStatus: {
      type: String,

      enum: [
        "pending",
        "approved",
        "rejected",
      ],

      default: "pending",
      index: true,
    },

    services: {
      type: [String],
      default: [],
    },

    accountNumber: {
       type: String,
       default: "",
      },

     ifscCode: {
     type: String,
     default: "",
      },

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
        type: String,
        default: "",
      },
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model( "users", userSchema);