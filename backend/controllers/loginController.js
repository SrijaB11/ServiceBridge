const userModel = require("../models/UserModel")
let jwt=require("jsonwebtoken")
require("dotenv").config()

const loginController = async (req,res)=>{
    let data=req.body
    try{
        let result= await userModel.findOne({email:data.email})

        if(!result){
            res.status(401).json({
                message:"Invalid email"
            })
        }

        if(result.password!= data.password){
            res.status().json({
                message:"Password wrong"
            })
        }

        let token = jwt.sign({id:result._id,role:result.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.json({
            token:token,
            message:"Successfull Login"
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).json({
            message:"error occured something Wrong"
        })
    }
}

module.exports = loginController