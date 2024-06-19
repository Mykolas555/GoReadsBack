const express = require('express');
const router = express.Router();
const readController = require("../controllers/readController")
const { tokenProtection } = require("../utils/authMiddlware")


router.get('/allReads',
    readController.getAllReads
)

router.get('/:userGoogleID',
    tokenProtection,
    readController.getAllUserReads
)

router.post('/postRead',
    tokenProtection, 
    readController.createRead)

module.exports = router;
