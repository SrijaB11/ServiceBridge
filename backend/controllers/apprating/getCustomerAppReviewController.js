const AppRating = require("../../models/AppRatingModel");

const getCustomerAppReview = async (req, res) => {
  try {
    const customerId = req.user._id;

    const review = await AppRating.findOne({ customerId })
      .populate("customerId", "fullName email");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "No app review found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer review fetched successfully",
      data: review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
    });

  }
};

module.exports = getCustomerAppReview;