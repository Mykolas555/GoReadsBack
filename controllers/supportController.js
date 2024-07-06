const fs = require('fs')
const Support = require('../models/supportModel')

exports.createSupportMessage = async (req, res) =>{
    try{
        const newMessage = await Support.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Message for support is created",
            data: {newMessage}
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: "Fail",
            message:err
        })
    }
}