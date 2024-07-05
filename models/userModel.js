const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "User must have name"],
    },
    lastName:{
        type:String,
        required:[true, 'User must have last name'],
    },
    email:{
        type:String,
        required:[true, "User must have email"],
    },
    password:{
        type:String,
        required:[true, 'User must password'],
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User