const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const { tokenProtection } = require("../utils/authMiddlware")

router.get('/user/:userID',
    tokenProtection, 
    userController.getUserByID
)

module.exports = router;
