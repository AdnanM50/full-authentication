// import e from "express";
import mongoose from "mongoose";
// import { reset } from "nodemon";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    lastLogin : { 
        type: Date,
        default: Date.now
    },
    isvarified : {
        type: Boolean,
        default: false
    },
    resetPasswordToken : String,
    resetPasswordExpiresAt : Date,
    varificationToken : String,
    varificationExpiresAt : Date
},{timestamps: true});

export default mongoose.model('User', userSchema);


