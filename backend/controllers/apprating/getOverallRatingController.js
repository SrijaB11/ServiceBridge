const AppRating = require("../../models/AppRatingModel");

const getOverallAppRatingController = async (req, res) => {
  try {
    // Total ratings
    const totalRatings = await AppRating.countDocuments();

    // Average rating
    const avgResult = await AppRating.aggregate([
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    const averageRating =
      avgResult.length > 0
        ? Number(avgResult[0].averageRating.toFixed(1))
        : 0;

    res.status(200).json({
      success: true,
      totalRatings,
      averageRating,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch app rating",
    });
  }
};

module.exports = getOverallAppRatingController;