const User = require("../../models/UserModel");
const Booking = require(
  "../../models/BookingModel"
);

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

    if (
      !req.files ||
      Object.keys(req.files).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    // GET FILE PATHS
    const profilePhoto =
      req.files["profilePhoto"]
        ? req.files["profilePhoto"][0]
            .path
        : "";

    const panCard =
      req.files["panCard"]
        ? req.files["panCard"][0].path
        : "";

    const skillDocs =
      req.files["skillDocs"]
        ? req.files["skillDocs"][0]
            .path
        : "";

    // UPDATE USER
    const updatedUser =
      await User.findByIdAndUpdate(
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
      message:
        "Documents uploaded successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getWorkerRequests = async (
  req,
  res
) => {
  try {
    const workerId = req.user._id;

    const requests =
      await Booking.find({
        worker: workerId,
      })
        .populate(
          "customer",
          "fullName email phone location documents"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      data: requests,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const acceptRequest = async (
  req,
  res
) => {
  try {
    const { requestId } =
      req.params;

    const updatedRequest =
      await Booking.findByIdAndUpdate(
        requestId,
        {
          status: "accepted",
        },
        {
          new: true,
        }
      );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message:
          "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Request Accepted Successfully",
      data: updatedRequest,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const rejectRequest = async (
  req,
  res
) => {
  try {
    const { requestId } =
      req.params;

    const updatedRequest =
      await Booking.findByIdAndUpdate(
        requestId,
        {
          status: "rejected",
        },
        {
          new: true,
        }
      );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message:
          "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Request Rejected Successfully",
      data: updatedRequest,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const completeRequest = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.requestId
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "completed";

    booking.paymentEnabled = true;

    await booking.save();

    res.status(200).json({
      success: true,
      message:
        "Booking completed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const updateWorkerProfile = async (
  req,
  res
) => {
  try {
    const workerId = req.user._id;

    const { phone, services } = req.body;

    const worker = await User.findById(
      workerId
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }
     if (phone) {
      worker.phone = phone;
    }

    if (
      services &&
      Array.isArray(services)
    ) {
      worker.services = services;
    }

    await worker.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      worker,
    });
     } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};





module.exports = {
  getWorkerProfile,
  uploadWorkerDocs,
  updateWorkerProfile,
  getWorkerRequests,
  acceptRequest,
  rejectRequest,
  completeRequest
};