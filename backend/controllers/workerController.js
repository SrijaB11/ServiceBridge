const Worker = require("../models/WorkerModel");

const uploadDocuments = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.files.idProof || !req.files.certificate) {
      return res.status(400).json({
        message: "Both documents are required"
      });
    }

    const worker = await Worker.create({
      name,
      idProof: req.files.idProof[0].path,
      certificate: req.files.certificate[0].path,
      isVerified: false
    });

    res.status(200).json({
      message: "Documents uploaded, waiting for admin approval",
      worker
    });
  } 
  
  catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error
    });
  }
};

module.exports = { uploadDocuments };