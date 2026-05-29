const User = require("../../models/UserModel"); 
const redisClient = require("../../config/redisClient");
const asyncHandler = require("../../utils/asyncHandler");

//get
const getAllWorkers = asyncHandler(async (req, res) => {
const cacheKey = "workers:all";

const cachedWorkers = await redisClient.get(cacheKey);

if (cachedWorkers) {
  return res.status(200).json({
      success: true,
      source: "redis",
      data: JSON.parse(cachedWorkers),
    });
  }

  const workers = await User.find({ role: "worker" }).lean();

  await redisClient.setEx(cacheKey, 300, JSON.stringify(workers));

  res.status(200).json({
    success: true,
    source: "database",
    data: workers,
  });
});

// Update
const updateWorker = async (req, res) => {
  try {
    const worker = await User.findOneAndUpdate(
      { _id: req.params.id, role: "worker" },
      req.body,
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({
      message: "Worker updated successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateWorker };

// Delete

const deleteWorker = async (req, res) => {
  try {
    const worker = await User.findOneAndDelete({
      _id: req.params.id,
      role: "worker",
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };



module.exports = { getAllWorkers,updateWorker,deleteWorker };