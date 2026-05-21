const AppRating = require("../../models/AppRatingModel");

const customerRatingController =
  async (req, res) => {
    try {

      const customerId = req.user._id;

      const {rating,review,} = req.body;

      // Rating validation
      if (!rating) {
        return res.status(400).json({
          success: false,
          message: "Rating is required",
        });
      }

      if (rating < 1 ||rating > 5) {
        return res.status(400).json({
          success: false,
          message:"Rating must be between 1 and 5",
        });
      }

      // Check existing rating
      const existingRating = await AppRating.findOne({customerId, });

      // Update existing
      if (existingRating) {

        existingRating.rating = rating;

        existingRating.review = review || "";

        await existingRating.save();

        return res.status(200).json({
          success: true,
          message:"Rating and review updated successfully",
          data: existingRating,
        });
      }

      // Create new
      const newRating = await AppRating.create({
          customerId,
          rating,
          review,
        });

      res.status(201).json({
        success: true,
        message:"App rated successfully",
        data: newRating,
      });

    } catch (error) {

      //console.log(error);

      res.status(500).json({
        success: false,
        message:"Failed to rate app",
      });

    }
  };

module.exports = customerRatingController;