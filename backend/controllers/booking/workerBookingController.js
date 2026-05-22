const Booking = require("../../models/BookingModel");

const createBookingWorker = async (req, res) => {
  try {
    const { workerId, date } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    // Prevent past booking
    if (bookingDate < today) {
      return res.status(400).json({
        message: "Cannot book past dates",
      });
    }

    // Check existing booking
    const existing = await Booking.findOne({
      worker: workerId,
      date: bookingDate,
      status: { $in: ["pending", "accepted"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "Worker not available on this date",
      });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      worker: workerId,
      date: bookingDate,
      baseAmount: 199,
    additionalCharges: 0,
      amount: 199,
      status: "pending",
    });

    res.status(201).json({
      message: "Request sent to worker",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createBookingWorker;
