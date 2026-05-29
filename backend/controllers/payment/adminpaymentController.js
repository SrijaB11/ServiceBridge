const razorpay = require("../../config/razorpay");
const crypto = require("crypto");

const Booking = require("../../models/BookingModel");

/* CREATE WORKER PAYMENT ORDER */

const createWorkerPaymentOrder = async (
  req,
  res
) => {
  try {
    const { bookingId } = req.body;

    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.workerPaid) {
      return res.status(400).json({
        success: false,
        message:
          "Worker already paid",
      });
    }

    const options = {
      amount:
        booking.workerAmount * 100,

      currency: "INR",

      receipt: `worker_${bookingId}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* VERIFY WORKER PAYMENT */

const verifyWorkerPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const sign =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSign =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRETKEY
        )
        .update(sign.toString())
        .digest("hex");

    const isAuthentic =
      expectedSign ===
      razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const booking =
      await Booking.findById(
        bookingId
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found",
      });
    }

    if (booking.workerPaid) {
      return res.status(400).json({
        success: false,
        message:
          "Worker already paid",
      });
    }

    booking.workerPaid = true;

    await booking.save();

    res.status(200).json({
      success: true,
      message:
        "Worker payment successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWorkerPaymentOrder,
  verifyWorkerPayment,
};