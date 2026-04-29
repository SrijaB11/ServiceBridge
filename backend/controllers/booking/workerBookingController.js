// controllers/bookingController.js
const Booking = require("../../models/BookingModel");

// 📌 Create booking (Customer clicks "Book Now")
const createBookingWorker = async (req, res) => {
  try {
    const { workerId, date } = req.body;

    // Prevent booking past dates
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        message: "Cannot book past dates"
      });
    }

    // Prevent duplicate booking
    const existing = await Booking.findOne({
      worker: workerId,
      date: date
    });

    if (existing) {
      return res.status(400).json({
        message: "Worker not available on this date"
      });
    }

    const booking = new Booking({
      customer: req.user._id,
      worker: workerId,
      date
    });

    await booking.save();

    res.status(201).json({
      message: "Request sent to worker",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createBookingWorker