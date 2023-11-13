const mongoose = require('mongoose')

const { Schema }=mongoose;

const UserSchema = new Schema({
    Name:{
        type: String,
        required:true,
    },
   
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('user',UserSchema)