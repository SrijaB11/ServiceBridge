const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  idProof: String,
  certificate: String,
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Worker", workerSchema);