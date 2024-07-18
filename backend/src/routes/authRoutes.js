const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let { email, username, password, passwordCheck } = req.body;

  if (password !== passwordCheck) {
    res.json({
      status: 402,
      message: "Passwords do not match"
    });
  } else if (!/^[a-zA-Z ]*$/.test(username)) {
    res.json({
      status: 400,
      message: "Invalid Username"
    });
  } else if (password.length < 8) {
    res.json({
      status: 400,
      message: "Invalid password"
    });
  } else {
    User.find({ email }).then(result => {
      if (result.length) {
        res.json({
          status: 400,
          message: "The user with the provided email already exists"
        });
      } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
          const newUser = new User({
            username,
            email,
            password: hashedPassword
          });

          newUser.save().then(result => {
            res.json({
              status: 200,
              message: "Register successfully"
            });
          }).catch(error => {
            res.json({
              status: 500,
              message: "Please try again later"
            });
          });
        }).catch(error => {
          res.json({
            status: 500,
            message: "Please try again later"
          });
        });
      }
    }).catch(error => {
      console.log(error);
      res.json({
        status: 400,
        message: "The user already exists"
      });
    });
  }
});

router.post('/login', (req, res) => {
  // Implement login logic here
});

module.exports = router;