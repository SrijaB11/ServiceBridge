const mongoose = require("mongoose");
require("dotenv").config();

function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log("error",err);
    })
}

module.exports=connectDB;
