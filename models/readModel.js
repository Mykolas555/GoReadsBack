const mongoose = require("mongoose")

const ReadSchema = new mongoose.Schema({
    theme:{
        type:String,
        required: [true, "User must have name"],
    },
    text:{
        type:String,
        required:[true, 'User must have last name'],
    },
    userName:{
        type:String,
        required:[true, "User must have email"],
    },
    userGoogleID:{
        type:String,
        required:[true, 'User must have google ID'],
    }, 
    }, { timestamps: true }
);

const Read = mongoose.model('Read', ReadSchema)

module.exports = Read