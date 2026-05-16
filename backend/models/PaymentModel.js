const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    adminCommission: {
      type: Number,
    },

    workerEarning: {
      type: Number,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentGateway: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },

    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);