const mongoose = require("mongoose")

const SupportSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true, 'Support message must have last text'],
    },
    userID:{
        type:String,
        required:[true, 'Support message have user ID'],
    }, 
    userNickname:{
        type:String,
        required:[true, 'Support message have user nickname'],
    }
    }, { timestamps: true }
);

const Support = mongoose.model('Support', SupportSchema)

module.exports = Support