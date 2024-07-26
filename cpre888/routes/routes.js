//\routes\routes.js

const express = require('express')
const {
    authenticatedUser,
    ensureAuthenticated
} = require('../lib/loginControl.js');
const {
    loginSubmit,
    otpVerify,
    profileUpdate,
    change_profile
} = require('../lib/main_control.js')

const router = express.Router();

router.post('/change_profile', change_profile )

router.post('/register', loginSubmit )

router.post('/login', authenticatedUser )

router.post('/verify-otp', otpVerify );

router.post('/profileUpdate', profileUpdate)

module.exports = router;



