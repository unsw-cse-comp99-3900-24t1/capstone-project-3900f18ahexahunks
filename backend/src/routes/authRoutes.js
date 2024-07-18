const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  let { email, username, password, passwordCheck } = req.body;

  if (password !== passwordCheck) {
    return res.json({
      status: 402,
      message: "Passwords do not match"
    });
  } else if (!/^[a-zA-Z ]*$/.test(username)) {
    return res.json({
      status: 400,
      message: "Invalid Username"
    });
  } else if (password.length < 8) {
    return res.json({
      status: 400,
      message: "Invalid password"
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: 400,
        message: "The user with the provided email already exists"
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    savedUser.token = token;
    await savedUser.save();

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Set cookie for 1 hour

    return res.json({
      status: 200,
      message: "Register successfully",
      token: token
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      message: "Please try again later"
    });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                status: 400,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                status: 400,
                message: "Invalid email or password"
            });
        }

        return res.json({
            status: 200,
            message: "Login successfully",
        });
    } catch (error) {
        console.error(error);
        return res.json({
        status: 500,
        message: "Please try again later"
        });
    }
});

router.delete('/delete', async (req, res) => {
    try {
      const { username, password } = req.body;
    
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.json({
          status: 400,
          message: "User not found"
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          status: 400,
          message: "Invalid username or password"
        });
      }
  
      await User.deleteOne({ username: username });
  
      return res.json({
        status: 200,
        message: "Account deleted successfully"
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status: 500,
        message: "Please try again later"
      });
    }
});

router.put('/user/update-password', async (req, res) => {
    const { newPassword, 'user-id': userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        status: 401,
        message: "user must be logged in"
      });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await user.save()

    return res.json({
        status: 200,
        message: "Password updated successfully"
    });
});

module.exports = router;
