const User = require("../../models/UserModel"); 

// create
const createWorker = async (req, res) => {
  try {
    const data = req.body;

    data.role = "worker"; 

    const worker = await User.create(data);

    res.status(201).json({
      message: "Worker created successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get
const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" });

    res.status(200).json({
      success: true,
      data: workers,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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



module.exports = { createWorker,getAllWorkers,updateWorker,deleteWorker };