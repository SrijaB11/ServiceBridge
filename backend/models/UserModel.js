const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:String,
    email:String,
    number:String,
    password:String,
    role:String
})

let UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;