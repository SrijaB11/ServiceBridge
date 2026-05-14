const Review = require("../../models/ReviewModel");

const getOverallRatingController = async (req, res) => {
  try {
    const workerId = req.user._id;

    // Get all reviews of worker
    const reviews = await Review.find({ worker: workerId });

    const totalReviews = reviews.length;

    // If no reviews
    if (totalReviews === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0
      });
    }

    // Calculate total rating
    const totalRating = reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0);

    // Average rating
    const averageRating = totalRating / totalReviews;

    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching overall rating"
    });
  }
};

module.exports = getOverallRatingController;