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
    enum: ["pending", "accepted", "rejected","completed","cancelled"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  adminCommission: {
  type: Number,
  default: 0,
   },

workerAmount: {
  type: Number,
  default: 0,
},

workerPaid: {
  type: Boolean,
  default: false,
},
  cancelledAt: {
    type: Date,
  },  
   paymentEnabled: {
      type: Boolean,
      default: false,
    },
  orderId: String,
  paymentId: String,
  amount: Number,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);  