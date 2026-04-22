const express = require("express")
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

 // register //
router.post("/register",async (req,res)=>{
        let data=req.body;
       
        try{
            let result =await userModel.create(data);
            res.status(201).json({
                message:"registration successfull"
            })
        }
        catch(err){
            res.status(500).json({
                message:"registeration unsuccessfull"
            })
        }
        
})

   

module.exports = router;