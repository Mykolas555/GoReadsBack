const fs = require('fs')
const Read = require('../models/readModel')

exports.createRead = async (req, res) =>{
    try{
        const newRead = await Read.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "New Read is created",
            data: {newRead}
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: "Fail",
            message:err
        })
    }
}

exports.deleteRead = async (req, res) => {
    try {
        const { ID, userID } = req.params;
        const read = await Read.findById(ID);
        if (!read) {
            return res.status(404).json({
                status: "Fail",
                message: "No read found with that ID"
            });
        }
        if (read.userID !== userID) {
            return res.status(403).json({
                status: "Fail",
                message: "You do not have permission to delete this read"
            });
        }
        await Read.findByIdAndDelete(ID);
        res.status(200).json({
            status: "Success",
            message: "Read successfully deleted"
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err.message
        });
    }
};

exports.getAllReads = async (req, res) => {
    try {
        const reads = await Read.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: "Success",
            results: reads.length,
            data: { reads }
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
}

exports.getAllUserReads = async (req, res) => {
    const { userID } = req.params;
    try {
      const reads = await Read.find({ userID }).sort({ createdAt: -1 });;
      res.status(200).json({
        status: "Success",
        results: reads.length,
        data: { reads }
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: "Fail",
        message: err
      });
    }
  };