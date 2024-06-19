const User = require('../models/userModel');

exports.findOrCreateUser = async (userID, userData) => {
    try {
        let user = await User.findOne({ googleID: userID });
        if (!user) {
            user = new User({
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                googleID: userID
            });
            await user.save();
        }
        return user;
    } catch (error) {
        throw error;
    }
};
