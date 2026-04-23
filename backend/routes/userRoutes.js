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



router.post("/login",async(req,res)=>{ 
        let data=req.body;
        try{
            let result= await userModel.findOne({email:data.email})
            // console.log(result);
            // console.log(process.env.JWT_SECRET);
            if(!result){
                return res.status(401).json({
                        message:"Invalid email"
                })
            }
            // console.log(result);
            if(result.password !== data.password){
                return res.status(401).json({
                        message:"Wrong password"
                })
            }
            let token =jwt.sign({id:result._id,role:result.role},process.env.JWT_SECRET,{expiresIn:"1d"})
            res.status(200).json({
                message:"Successfully login",
                token:token
            })
        }
        catch(err){
            //console.log(err)
            res.status(500).json({
                message:"Unsuccessfull login"
            })
        }

})

   

module.exports = router;