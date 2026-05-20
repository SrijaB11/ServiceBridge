const Booking = require("../../models/BookingModel");

const payWorkerController = async (req,res) => {
  try {

    const { bookingId } = req.body;

    const booking =await Booking.findById(bookingId).populate("worker");

    if (!booking) {
      return res.status(404).json({
        success:false,
        message:"Booking not found"
      });
    }

    if (booking.paymentStatus !=="paid") {
      return res.status(400).json({
        success:false,
        message:
        "Customer payment pending"
      });
    }

    if (booking.workerPaid) {
      return res.status(400).json({
        success:false,
        message:
        "Worker already paid"
      });
    }

    booking.workerPaid = true;

    await booking.save();

    res.status(200).json({
      success:true,

      message:"Worker payment completed",

      worker: booking.worker
      ? {
          id:booking.worker._id,
          name:booking.worker.fullName,
          email:booking.worker.email,
          phone:booking.worker.phone,
          location:booking.worker.location
        }
      : {
          id:null,
          name:"Worker deleted"
        },

      amountPaid: booking.workerAmount,
      adminCommission:booking.adminCommission
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

module.exports =payWorkerController;