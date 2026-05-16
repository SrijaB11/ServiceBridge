const Booking = require("../../models/BookingModel");

const getCancelledBookings = async (req, res) => {
  try {
    const cancelledBookings = await Booking.find({
      customer: req.user._id,
      status: "cancelled",
    })
      .populate("worker", "fullName email phone services")
      .sort({ cancelledAt: -1 });

    res.status(200).json({
      success: true,
      count: cancelledBookings.length,
      bookings: cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getCancelledBookings;