const User = require('../models/userModel');

exports.getUserByID = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "Success",
            data: { user }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "Fail",
            message: err.message
        });
    }
};
