const AppRating = require( "../../models/AppRatingModel");

const getAverageRating = async (req, res) => {
    try {

      const ratings = await AppRating.find();

      if ( ratings.length === 0) {
        return res.status(200).json({
          success: true,
          averageRating: 0,
        });
      }

      const total = ratings.reduce(
          (sum, item) => sum + item.rating, 0 );

      const average = total / ratings.length;

      res.status(200).json({
        success: true,
        averageRating: average,
      });

    } catch (error) {

      //console.log(error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch ratings",
      });
    }
  };

module.exports = getAverageRating;