const User = require("../../models/UserModel");

const getWorkerProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const worker = await User.findById(
      userId
    ).select("-password");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,
      data: worker,
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadWorkerDocs = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    // FIND USER
    const worker = await User.findById(
      userId
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    // PREVENT RE-UPLOAD
    if (
      worker.documents?.profilePhoto ||
      worker.documents?.panCard ||
      worker.documents?.skillDocs
        ?.length > 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Documents already uploaded",
      });
    }

    // CHECK FILES
    if (
      !req.files ||
      Object.keys(req.files).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    // PROFILE PHOTO
    const profilePhoto =
      req.files["profilePhoto"]
        ? req.files["profilePhoto"][0]
            .path
        : "";

    // PAN CARD
    const panCard =
      req.files["panCard"]
        ? req.files["panCard"][0].path
        : "";

    // SKILL DOCS ARRAY
    const skillDocs =
      req.files["skillDocs"]
        ? req.files["skillDocs"].map(
            (file) => file.path
          )
        : [];

    // UPDATE USER
    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          documents: {
            profilePhoto,
            panCard,
            skillDocs,
          },

          professionalStatus:
            "pending",

          isProfessional: false,
        },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message:
        "Documents uploaded successfully. Waiting for admin verification.",

      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getWorkerProfile,
  uploadWorkerDocs,
};