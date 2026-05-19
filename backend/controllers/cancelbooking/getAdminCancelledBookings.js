const Booking = require("../../models/BookingModel");

const getAdminCancelledBookings = async (req, res) => {
  try {
    // admin view cancelled bookings
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const cancelledBookings = await Booking.find({
      status: "cancelled",
    })
      .populate("customer", "fullName email phone")
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

module.exports = getAdminCancelledBookings;