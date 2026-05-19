const Booking = require("../../models/BookingModel");
const Review = require("../../models/ReviewModel");

const customerHistoryController = async (req, res) => {
  try {
    const customerId = req.user.id;

    const bookings = await Booking.find({
      customer: customerId,
    })
      .populate(
        "worker",
        "fullName email phone location services documents"
      )
      .sort({ createdAt: -1 });

      console.log(bookings);

    const history = [];

    for (const booking of bookings) {

      const review = await Review.findOne({
        booking: booking._id,
        customer: customerId,
      });

      history.push({
        bookingId: booking._id,

        bookingDate: booking.date,

        bookingStatus: booking.status,

        worker: booking.worker
          ? {
              workerId:
                booking.worker._id || null,

              name:
                booking.worker.fullName || "",

              email:
                booking.worker.email || "",

              phone:
                booking.worker.phone || "",

              location:
                booking.worker.location || "",

              services:
                booking.worker.services || [],

              profilePhoto:
                booking.worker.documents
                  ?.profilePhoto || "",
            }
          : {
              workerId: null,
              name: "Worker removed",
              email: "",
              phone: "",
              location: "",
              services: [],
              profilePhoto: "",
            },

        payment: {
          amount:
            booking.amount || 0,

          paymentStatus:
            booking.paymentStatus || "pending",

          paymentId:
            booking.paymentId || "",

          orderId:
            booking.orderId || "",

          adminCommission:
            booking.adminCommission || 0,

          workerAmount:
            booking.workerAmount || 0,

          workerPaid:
            booking.workerPaid || false,
        },

        review: review
          ? {
              rating: review.rating,
              comment: review.comment,
              reviewDate:
                review.createdAt,
            }
          : null,
      });
    }

    res.status(200).json({
      success: true,
      total: history.length,
      history,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = customerHistoryController;