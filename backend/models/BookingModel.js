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

   baseAmount: {
        type: Number,

        default: 199,
      },

      additionalCharges: {
        type: Number,

        default: 0,
      },

      additionalChargesReason: {
        type: String,

        default: "",
      },

      amount: {
        type: Number,

        default: 199,
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
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);  