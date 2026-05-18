const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
     complaintBy: {
        type: String,
        enum: [
          "customer",
          "worker",
        ],
        required: true,
      },
    status: {
      type: String,
      enum: ["pending", "in_review", "resolved"],
      default: "pending"
    },
    adminResponse: {
      type: String
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    resolvedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);