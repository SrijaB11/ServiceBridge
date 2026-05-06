const User = require("../../models/UserModel");

const uploadWorkerDocs = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }


    const profilePhoto = req.files["profilePhoto"]
      ? req.files["profilePhoto"][0].path
      : "";

    const panCard = req.files["panCard"]
      ? req.files["panCard"][0].path
      : "";

    const skillDoc = req.files["skillDoc"]
      ? req.files["skillDoc"][0].path
      : "";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        documents: {
          profilePhoto,
          panCard,
          skillDoc,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Documents uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadWorkerDocs }; 