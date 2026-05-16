const Booking = require("../../models/BookingModel");

const gettotalBookings = async (req, res) => {
  try {
    // only customer allowed
    if (req.user.role !== "customer") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Count total bookings of logged-in customer
    const totalBookings = await Booking.countDocuments({
      customer: req.user._id,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer dashboard stats",
      error: error.message,
    });
  }
};

module.exports = gettotalBookings;