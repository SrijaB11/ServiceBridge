const Review = require("../../models/ReviewModel");

const getMyReviews = async (req, res) => {
  try {
    const workerId = req.user._id; // logged-in worker

    const reviews = await Review.find({ worker: workerId })
      .populate("customer", "fullName");

    res.json(reviews);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching reviews"
    });
  }
};

module.exports = getMyReviews;