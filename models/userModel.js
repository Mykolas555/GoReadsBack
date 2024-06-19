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
    googleID:{
        type:String,
        required:[true, 'User must have google ID'],
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User