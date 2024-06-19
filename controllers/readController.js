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
    const { userGoogleID } = req.params;
  
    try {
      const reads = await Read.find({ userGoogleID }).sort({ createdAt: -1 });;
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