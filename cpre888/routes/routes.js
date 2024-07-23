const express = require('express')
const {
    authenticatedUser,
    ensureAuthenticated
} = require('../lib/loginControl.js');
const {
    loginSubmit,
    otpVerify
} = require('../lib/main_control.js')

const router = express.Router();

router.post('/register', loginSubmit )

router.post('/login', authenticatedUser )

router.post('/verify-otp', otpVerify );

module.exports = router;



