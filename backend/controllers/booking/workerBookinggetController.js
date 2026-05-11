const Booking = require("../../models/BookingModel");

const getCustomerBookings = async (req, res) => {
  try {

    // Logged in customer bookings
    const bookings = await Booking.find({
      customer: req.user._id,
    })
      .populate("worker", "fullName email phone services")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = getCustomerBookings;