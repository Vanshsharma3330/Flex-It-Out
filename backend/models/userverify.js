const mongoose=require('mongoose');


const UserVerification = new mongoose.Schema({
     
    userId:{
        type:String,
    },
   
    uniqueString:{
        type:String,
    },

    createdAt :{
        type : Date
    },

    expiresAt: {
        type : Date
    }

});

const UserVerificationModel = mongoose.model('UserVerification',UserVerification)
module.exports= UserVerificationModel;