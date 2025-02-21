const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new Schema({
    profile_pic : String,
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    dob : String,
    registered_at : Date,
    verified : Boolean,
    randomSeed : Number
})

const userModel = mongoose.model("Users", userSchema, "users");
module.exports = {userModel};