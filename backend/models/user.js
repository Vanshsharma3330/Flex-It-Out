const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new Schema({
    profile_pic : String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob : String,
    registered_at : Date,
    verified : Boolean,
    randomSeed : Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("Users", userSchema, "users");
module.exports = {userModel};