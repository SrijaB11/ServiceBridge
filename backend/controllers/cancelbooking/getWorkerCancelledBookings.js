const Booking = require("../../models/BookingModel");

const getWorkerCancelledBookings = async (req, res) => {
  try {
    if (req.user.role !== "worker") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const cancelledBookings = await Booking.find({
      worker: req.user._id,
      status: "cancelled",
    })
      .select("service bookingDate cancelledAt customer")
      .populate("customer", "fullName email phone")
      .sort({ cancelledAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      page,
      count: cancelledBookings.length,
      bookings: cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getWorkerCancelledBookings;