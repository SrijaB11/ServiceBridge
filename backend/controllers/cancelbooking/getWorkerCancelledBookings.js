const Booking = require("../../models/BookingModel");

const getWorkerCancelledBookings = async (req, res) => {
  try {
    // worker view cancelled bookings
    if (req.user.role !== "worker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const cancelledBookings = await Booking.find({
      worker: req.user._id,   // worker logged in
      status: "cancelled",    // cancelled by customer
    })
      .populate("customer", "fullName email phone")
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

module.exports = getWorkerCancelledBookings;