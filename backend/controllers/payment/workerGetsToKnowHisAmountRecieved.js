const Booking = require("../../models/BookingModel");

const workerGetsToKnowHisRecievedAmountController = async (req, res) => {
  try {

    // worker id from login middleware
    const workerId = req.user.id;

    const payments = await Booking.find({
      worker: workerId,
      workerPaid: true
    })
    .populate("customer", "fullName email phone")
    .sort({ updatedAt: -1 });

    const totalEarnings = payments.reduce(
      (sum, item) => sum + (item.workerAmount || 0),
      0
    );

    const history = payments.map(item => ({
      bookingId: item._id,

      customer: item.customer
        ? {
            id: item.customer._id,
            name: item.customer.fullName,
            email: item.customer.email,
            phone: item.customer.phone
          }
        : null,

      amountReceived: item.workerAmount,

      adminCommission: item.adminCommission,

      paymentStatus: item.workerPaid,

      paymentDate: item.updatedAt,

      service: item.serviceName || null
    }));

    res.status(200).json({
      success: true,

      totalPayments: payments.length,

      totalEarnings,

      history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = workerGetsToKnowHisRecievedAmountController;