const getWorkerRequest = async (req, res) => {
  try {
    const bookings = await Booking.find({
      worker: req.user._id
    }).populate("customer", "fullName phone");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getWorkerRequest;