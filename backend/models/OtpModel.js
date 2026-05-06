const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  userData: {
    type: Object,
    required: false ,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  purpose: {
  type: String,
  enum: ["register", "reset"],
  required: true
  },
}, { timestamps: true });

// Auto delete after expiry
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);