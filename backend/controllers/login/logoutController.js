const userModel = require("../../models/UserModel");

const logoutController = async (req, res) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {

      await userModel.findOneAndUpdate(
        { refreshToken },
        {
          refreshToken: null,
        }
      );

    }

    res.clearCookie("refreshToken");

    return res.json({
      message: "Logout successful",
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = logoutController;