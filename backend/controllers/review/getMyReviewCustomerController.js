const Review = require("../../models/ReviewModel");

const getCustomerReviews = async (req, res) => {
  try {

    const customerId = req.user._id;

    const reviews = await Review.find({
      customer: customerId
    })

    .populate(
      "worker",
      "fullName email phone location"
    )

    .populate(
      "booking",
      "status serviceDate amount"
    )

    .sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      totalReviews: reviews.length,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });

  }
};

module.exports = getCustomerReviews;