const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected","completed"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  orderId: String,
  paymentId: String,
  amount: Number
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);