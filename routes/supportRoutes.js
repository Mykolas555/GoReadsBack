const express = require('express');
const router = express.Router();
const supportController = require("../controllers/supportController")
const { tokenProtection } = require("../utils/authMiddlware")

router.post('/support',
    tokenProtection, 
    supportController.createSupportMessage
)

module.exports = router;
