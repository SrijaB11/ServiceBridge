const userModel = require("../models/UserModel");


const regController = async (req,res)=>{
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
        
}

module.exports = regController;