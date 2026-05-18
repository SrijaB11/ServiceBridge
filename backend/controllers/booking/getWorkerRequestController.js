const Booking = require(
  "../../models/BookingModel"
);

const getWorkerRequest = async (
  req,
  res
) => {
  try {

    console.log(
      "Logged Worker:",
      req.user
    );

    const bookings =
      await Booking.find({
        worker: req.user._id,
      }).populate(
        "customer"
      );

    console.log(bookings);

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {

    console.log(
      "REQUEST ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports =
  getWorkerRequest;