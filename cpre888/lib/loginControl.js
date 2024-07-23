const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const utils = require('../utils/utils.js')
const nodemailer = require('nodemailer');

passport.use(new LocalStrategy(async (username, password, done) => {
    
    if (username.includes("@")) {
        user = await utils.getUserdataByEmail(username)
    } else {
        user = await utils.getUserdata(username)
    }

    // console.log(user)

    if (!user) {
        return done(null, false)
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            console.log("Wrong password.")
            return done(null, false)
        }
    } catch (err) {
        console.log('Local passport error.')
        return done(err);
    }

}));

passport.serializeUser((user, done) => {
    const sessionUser = {
        id: user.id,
        username: user.username,
        customData: 'This is some custom data'
    };
    done(null, sessionUser);
});

passport.deserializeUser(async (sessionUser, done) => {
    try {
        const data = await utils.getUserdataByid(sessionUser.id)
        return done(null, data)
        } catch (err) {
        return done(err);
    }
});

function authenticatedUser(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.redirect('/auth/login'); 
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);  
            }
            return res.redirect(`/profile/${req.body.username}`); 
        });
    })(req, res, next);
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/auth/login');
    }
}

async function register (email, password) {
    const checker = await utils.getUserdataByEmail(email)


    if (checker) {
        console.log('User already exist.')
        return false
    }


    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);
    await utils.insertUser(email, hash_pass, email)


    const user = await utils.getUserdata(email)
    await utils.createProfile(null, null, user.id)

    console.log('Successful register.')
    return true

}

const sendOtpEmail = (user, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pumasinp@gmail.com',
            pass: 'aqazmvovsacnoppf', // Your app password
        },
    });
  
    const mailOptions = {
      from: 'pumasinp@gmail.com',
      to: user,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };

module.exports = {
    authenticatedUser,
    ensureAuthenticated,
    register,
    sendOtpEmail
}
