const AppRating = require("../../models/AppRatingModel");

const customerRatingController = async (req, res) => {
  try {
    const customerId = req.user._id;

    const { rating } = req.body;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    // Check existing rating
    const existingRating = await AppRating.findOne({
      customerId,
    });

    // Update rating
    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        data: existingRating,
      });
    }

    // Create rating
    const newRating = await AppRating.create({
      customerId,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "App rated successfully",
      data: newRating,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to rate app",
    });
  }
};

module.exports = customerRatingController;