const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },
    complaintText: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "in_review", "resolved"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);