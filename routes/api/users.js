const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User Model
const User = require('../../models/User');

//@route POST api/user/register
//@desc Register new user
//@access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors)
      }
      else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //default
        })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,  // avatar: avatar
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

//@route POST api/user/login
//@desc Login User / Return JWT Token
//@access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by email 
  User.findOne({ email /*email:email*/ })
    .then(user => {
      //Check for User
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User Matched
            const payload = { id: user.id, name: user.name, email: user.email, avatar: user.avatar } //create jwt payload
            //Sign Token
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 604800 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              });
          } else {
            errors.password = "Password Incorrect";
            return res.status(400).json(errors);
          }
        })
    })
})

//@route GET api/user/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user)
})

module.exports = router;