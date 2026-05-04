const Booking = require("../../models/BookingModel");

// Get booked dates of a worker
const getWorkerAvailability = async (req, res) => {
  try {
    const { workerId } = req.params;

    const bookings = await Booking.find({
      worker: workerId,
      status: { $in: ["pending", "accepted"] }
    });

    const bookedDates = bookings.map(b => b.date);

    res.json(bookedDates);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getWorkerAvailability