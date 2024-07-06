const mongoose = require("mongoose")

const ReadSchema = new mongoose.Schema({
    theme:{
        type:String,
        required: [true, "Read must have theme"],
    },
    text:{
        type:String,
        required:[true, 'Read must have last text'],
    },
    userName:{
        type:String,
        required:[true, "Read must have user name"],
    },
    userID:{
        type:String,
        required:[true, 'Read must have user ID'],
    }, 
    userNickname:{
        type:String,
        required:[true, 'Read must have user nickname'],
    }
    }, { timestamps: true }
);

const Read = mongoose.model('Read', ReadSchema)

module.exports = Read