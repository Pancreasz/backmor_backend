const utils = require('../utils/utils.js');
const otpGenerator = require('otp-generator');
const path = require('path')
const { sendOtpEmail, register } = require('../lib/loginControl.js')

async function loginSubmit (req, res) {
    req.session.email = req.body.username
    req.session.password = req.body.password

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    req.session.otp = otp;
    console.log(otp)

    sendOtpEmail(req.body.username, otp);
    res.redirect('/register/verify')

}

async function otpVerify (req, res) {
    const otp = await req.body.otp;
    
    if (req.session.otp == otp) {
      const response = await register(req.session.email, req.session.password)
      if (response) {
        res.redirect('/auth/login');
      } else {
        res.redirect('/')
      }

    } else {
      res.send('Invalid OTP.');
    }
}

async function profileUpdate (req, res) {
  const formdata = req.body;
  try {
      await utils.updateUsername(formdata, req.user.id);

      req.user.username = formdata.username;

      await utils.updateData(formdata, req.user.id);
      res.status(200).json({ redirect: `/profile/${req.user.username}` });
  } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Internal Server Error');
  }
}



module.exports = {
    loginSubmit,
    otpVerify,
    profileUpdate
}