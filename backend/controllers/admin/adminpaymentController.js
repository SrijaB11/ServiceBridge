const Booking = require(
  "../../models/BookingModel"
);

const getWorkerPayments =
  async (req, res) => {
    try {

      const payments =
        await Booking.find({
          paymentStatus: "paid",
        })
          .populate(
            "worker",
            "fullName email phone"
          )
          .populate(
            "customer",
            "fullName email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


const markWorkerPaid =
  async (req, res) => {
    try {

      const booking =
        await Booking.findById(
          req.params.bookingId
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      booking.workerPaid = true;

      await booking.save();

      res.status(200).json({
        success: true,
        message:
          "Worker marked as paid",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


const getPaymentStats =
  async (req, res) => {
    try {

      const bookings =
        await Booking.find({
          paymentStatus: "paid",
        });

      const totalRevenue =
        bookings.reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

      const totalCommission =
        bookings.reduce(
          (acc, item) =>
            acc +
            item.adminCommission,
          0
        );

      const totalWorkerPayout =
        bookings.reduce(
          (acc, item) =>
            acc + item.workerAmount,
          0
        );

      res.status(200).json({
        success: true,

        totalRevenue,

        totalCommission,

        totalWorkerPayout,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


const getCustomerPayments =
async (req,res)=>{
  try{

    const payments =
    await Booking.find({
      paymentStatus:"paid"
    })

    .populate(
      "customer",
      "fullName email phone"
    )

    .populate(
      "worker",
      "fullName email"
    )

    .sort({
      createdAt:-1
    });

    const history =
    payments.map((item)=>({

      bookingId:item._id,

      customer:item.customer,

      worker:item.worker,

      amountPaid:item.amount,

      adminCommission:
      item.adminCommission,

      workerAmount:
      item.workerAmount,

      workerPaid:item.workerPaid,

      paymentDate:
      item.updatedAt,

      paymentStatus:
      item.paymentStatus

    }));


    res.status(200).json({
      success:true,
      totalPayments:
      history.length,

      data:history
    });

  }

  catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

module.exports = {
  getWorkerPayments,
  markWorkerPaid,
  getPaymentStats,
  getCustomerPayments
};