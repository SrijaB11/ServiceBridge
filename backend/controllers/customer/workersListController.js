const userModel = require("../../models/UserModel");

// Get workers by service
const getWorkersByService = async (req, res) => {
  try {
    const { service } = req.params;

  const workers = await userModel.find({
  role: "worker",
  services: service   
}).select("-password");

    res.json(workers);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching workers",
      error: error.message
    });
  }
};

module.exports =  getWorkersByService ; 