const Booking = require(
  "../../models/BookingModel"
);

const addAdditionalChargesController =
  async (req, res) => {
    try {

      const {
        requestId,
      } = req.params;

      const {
        additionalCharges,
        additionalChargesReason,
      } = req.body;

      const booking =
        await Booking.findById(
          requestId
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found",
        });
      }

      booking.additionalCharges =
        Number(
          additionalCharges
        );

      booking.additionalChargesReason =
        additionalChargesReason;

      booking.amount =
        booking.baseAmount +
        Number(
          additionalCharges
        );

      await booking.save();

      res.status(200).json({
        success: true,
        message:
          "Additional charges updated",

        booking,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports =
  addAdditionalChargesController;