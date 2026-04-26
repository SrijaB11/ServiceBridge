const express = require("express")
const regController = require("../controllers/regController");
const loginController = require("../controllers/loginController");

const router = express.Router();

 // register //
router.post("/register",regController);

router.post("/login",loginController)

module.exports=router;
