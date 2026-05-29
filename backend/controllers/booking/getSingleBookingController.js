const Booking = require(
  "../../models/BookingModel"
);

const getSingleBookingController =
  async (req, res) => {
    try {

      const booking =
        await Booking.findById(
          req.params.id
        )

        .populate(
          "worker",
          "fullName"
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      res.status(200).json({
        success: true,

        booking,
      });

    } catch (error) {

      //console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports =
  getSingleBookingController;