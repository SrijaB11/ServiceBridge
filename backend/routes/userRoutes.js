const express = require("express")
const regController = require("../controllers/regController");



const router = express.Router();


 // register //
router.post("/register",regController);

  


module.exports=router