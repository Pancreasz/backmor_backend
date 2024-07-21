const express = require('express')
const {
    authenticatedUser
} = require('../lib/loginControl.js');
const {
    loginSubmit
} = require('../lib/main_control.js')

const router = express.Router();

router.post('/register', loginSubmit )

router.post('/login', authenticatedUser )

module.exports = router;



