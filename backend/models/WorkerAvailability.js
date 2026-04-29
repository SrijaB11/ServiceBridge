const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     date: { type: String, required: true },  

     isBooked: {
      type: Boolean,
      default: false,
    },
  },
 
);

module.exports = mongoose.model("WorkerAvailability", availabilitySchema);