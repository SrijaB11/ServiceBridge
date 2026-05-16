const Booking = require("../../models/BookingModel");

const admingetAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "fullName email phone")
      .populate("worker", "fullName email phone services")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = admingetAllBookings;