const Booking = require("../../models/BookingModel");

const customercancelBooking = async (req, res) => {
  try {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (
      booking.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to cancel this booking",
      });
    }

    // Cannot cancel completed/cancelled
    if (
      ["completed", "cancelled"]
      .includes(booking.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
        `Booking already ${booking.status}`,
      });
    }

    // make slot available again
    booking.status = "cancelled";

    booking.cancelledAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message:
      "Booking cancelled and date released successfully",
      booking,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = customercancelBooking;

