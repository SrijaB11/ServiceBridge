const razorpay = require("../../config/razorpay");
const Payment = require("../../models/PaymentModel");

const createOrder = async (req, res) => {
  try {
    const { amount, bookingId, workerId } = req.body;

    // Only customer can create payment
    if (req.user.role !== "customer") {
      return res.status(403).json({ message: "Only customers can make payments" });
    }

    if (!amount || !bookingId || !workerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Create Razorpay order (money → ADMIN)
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `booking_${bookingId}_${Date.now()}`,
    });

    // 2️⃣ Save payment in DB
    const payment = await Payment.create({
      booking: bookingId,
      customer: req.user._id, // CUSTOMER
      worker: workerId,       // WORKER (for future settlement)
      amount,
      orderId: order.id,
      status: "created",
    });

    // 3️⃣ Send order details to frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      paymentId: payment._id,
    });

  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

module.exports = createOrder;