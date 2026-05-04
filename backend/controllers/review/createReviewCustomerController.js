const Review = require("../../models/ReviewModel");
const Booking = require("../../models/BookingModel");

const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only customer can review
    if (booking.customer.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Only after completion
    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "Work not completed yet"
      });
    }

    // Prevent duplicate review
    const already = await Review.findOne({ booking: bookingId });
    if (already) {
      return res.status(400).json({
        message: "Already reviewed"
      });
    }

    const review = await Review.create({
      customer: userId,
      worker: booking.worker,
      booking: bookingId,
      rating,
      comment
    });

    res.status(201).json({
      message: "Review added",
      review
    });

  } catch (err) {
    res.status(500).json({
      message: "Error adding review"
    });
  }
};

module.exports = createReview;