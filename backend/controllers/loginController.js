const userModel = require("../models/UserModel")
let jwt=require("jsonwebtoken")
require("dotenv").config()

const loginController = async (req,res)=>{
    let data=req.body
    try{
        let result= await userModel.findOne({email:data.email})

        if (!result) {
      return res.status(401).json({
        message: "Invalid email"
      });
    }

       if (result.password !== data.password) {
      return res.status(401).json({
        message: "Password wrong"
      });
    }
        //token generation
        let token = jwt.sign({id:result._id,role:result.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.json({
            token:token,
            message:"Successfull Login"
        })
    }
    catch (err) {
    return res.status(500).json({
      message: "Error "
    });
    }
}

module.exports = loginController