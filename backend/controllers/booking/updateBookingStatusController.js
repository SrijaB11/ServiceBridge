const Booking = require("../../models/BookingModel");

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // accepted / rejected

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking updated",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateBookingStatus;