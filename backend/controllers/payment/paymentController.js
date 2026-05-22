const razorpay = require(
  "../../config/razorpay"
);

const crypto = require("crypto");

const Booking = require(
  "../../models/BookingModel"
);



const createOrder = async (
  req,
  res
) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
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



const verifyPayment = async (
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

    /* DEBUG */

    console.log(
      "REQ BODY:",
      req.body
    );

    console.log(
      "BOOKING ID:",
      bookingId
    );

    /* SIGNATURE */

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

    /* PAYMENT FAILED */

    if (!isAuthentic) {

      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message:
          "Booking not found",
      });
    }

    /* FINAL TOTAL */

        const totalAmount = booking.baseAmount + booking.additionalCharges;

/* COMMISSION */

        const adminCommission = totalAmount * 0.05;

        const workerAmount = totalAmount - adminCommission;

    /* UPDATE BOOKING */

    booking.paymentStatus =
      "paid";

    booking.paymentId =
      String(
    razorpay_payment_id
     );

      booking.orderId =
         String(
         razorpay_order_id
        );

    booking.adminCommission =
      adminCommission;

    booking.workerAmount =
      workerAmount;
       console.log("BOOKING BEFORE SAVE:", booking);

       booking.amount = totalAmount;

    await booking.save();

    /* SUCCESS RESPONSE */

    res.status(200).json({
      success: true,
      message:
        "Payment successful",

      adminCommission,

      workerAmount,
    });

  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};